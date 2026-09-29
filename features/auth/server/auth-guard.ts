import {
  accessTokenCookieOptions,
  createAccessToken,
  hasRefreshSession,
  verifyAccessToken,
  verifyRefreshToken,
} from '@/features/auth/lib/jwt';
import { ApiResponse } from '@/shared/http/api-response';
import { cookies } from 'next/headers';

type Authenticated = {
  authenticated: true;
  userId: string;
};

type Unauthenticated = {
  authenticated: false;
  response: Response;
};

export type AuthGuardResult = Authenticated | Unauthenticated;

const unauthorized = (): Unauthenticated => ({
  authenticated: false,
  response: ApiResponse.unauthorized('Authentication required'),
});

export const requireAuth = async (): Promise<AuthGuardResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) {
    try {
      const { userId } = verifyAccessToken(accessToken);
      return { authenticated: true, userId };
    } catch {
      cookieStore.delete('access_token');
    }
  }

  const refreshToken = cookieStore.get('refresh_token')?.value;
  if (!refreshToken) return unauthorized();

  try {
    const session = verifyRefreshToken(refreshToken);
    const sessionExists = await hasRefreshSession(session);

    if (!sessionExists) {
      cookieStore.delete('refresh_token');
      return unauthorized();
    }

    cookieStore.set(
      'access_token',
      createAccessToken({ userId: session.userId }),
      accessTokenCookieOptions,
    );

    return { authenticated: true, userId: session.userId };
  } catch {
    cookieStore.delete('refresh_token');
    return unauthorized();
  }
};
