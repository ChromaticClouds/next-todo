import {
  createRefreshToken,
  storeRefreshToken,
  tokenCookieOptions,
} from '@/features/auth/lib/jwt';
import { runEffect } from '@/lib/effect';
import { ApiResponse } from '@/shared/http/api-response';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  // Already identified by db transaction
  const { id } = await params;
  const cookieStore = await cookies();

  if (!id) return ApiResponse.badRequest('Not found user');

  const jti = crypto.randomUUID();

  const refreshToken = createRefreshToken({ userId: id, jti });

  cookieStore.set('refresh_token', refreshToken, tokenCookieOptions);

  return runEffect({
    effect: storeRefreshToken({ userId: id, jti }),
    onSuccess: () => NextResponse.redirect(new URL('/', request.url)),
    onError: {
      StoreRefreshTokenError: () =>
        NextResponse.redirect(new URL('/error', request.url)),
    },
    
    onUnexpectedError: () =>
      NextResponse.redirect(new URL('/error', request.url)),
  });
};
