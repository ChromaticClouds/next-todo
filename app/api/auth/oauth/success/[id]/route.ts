import {
  accessTokenCookieOptions,
  createToken,
  refreshTokenCookieOptions,
  storeRefreshToken,
} from '@/features/auth/lib/jwt';
import { consumeOAuthHandoff } from '@/features/auth/services/oauth-handoff';
import { UserModel } from '@/features/user/server/user-model';
import { runEffect } from '@/lib/effect';
import { withMongo } from '@/lib/mongoose';
import { ApiResponse } from '@/shared/http/api-response';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id: handoffToken } = await params;
  const cookieStore = await cookies();

  if (!handoffToken) return ApiResponse.badRequest('Invalid OAuth handoff');

  const userId = await consumeOAuthHandoff(handoffToken);

  if (!userId)
    return NextResponse.redirect(
      new URL('/login?error=expired_oauth_handoff', request.url),
    );

  return withMongo(async () => {
    const user = await UserModel.findById(userId).select('_id').lean();

    if (!user)
      return NextResponse.redirect(
        new URL('/login?error=user_not_found', request.url),
      );

    const [accessToken, refreshToken, jti] = createToken({ userId });

    return runEffect({
      effect: storeRefreshToken({ userId, jti }),
      onSuccess: () => {
        cookieStore.set('access_token', accessToken, accessTokenCookieOptions);
        cookieStore.set(
          'refresh_token',
          refreshToken,
          refreshTokenCookieOptions,
        );

        return NextResponse.redirect(new URL('/', request.url));
      },
      onError: {
        StoreRefreshTokenError: () =>
          NextResponse.redirect(new URL('/error', request.url)),
      },
      onUnexpectedError: () =>
        NextResponse.redirect(new URL('/error', request.url)),
    });
  });
};
