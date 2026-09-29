import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '@/features/auth/lib/jwt';
import { authService } from '@/features/auth/server/auth-service';
import { runApiEffect } from '@/lib/effect';
import { withMongo } from '@/lib/mongoose';
import { ApiResponse } from '@/shared/http/api-response';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * Local login
 */
export const POST = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const body = await request.json();

  return withMongo(() =>
    runApiEffect({
      effect: authService.login(body),
      onSuccess: ({ accessToken, refreshToken, user }) => {
        cookieStore.set('access_token', accessToken, accessTokenCookieOptions);
        cookieStore.set(
          'refresh_token',
          refreshToken,
          refreshTokenCookieOptions,
        );

        return ApiResponse.ok({ user }, 'Login successful');
      },
      onError: {
        ValidationError: ({ issues }) =>
          ApiResponse.badRequest('Invalid login payload', issues),
        InvalidCredentialsError: ({ message }) =>
          ApiResponse.unauthorized(message),
        FindUserError: () =>
          ApiResponse.internalServerError('Failed to authenticate user'),
        StoreRefreshTokenError: () =>
          ApiResponse.internalServerError('Failed to create session'),
      },
    }),
  );
};
