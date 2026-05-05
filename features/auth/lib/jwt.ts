import jwt from 'jsonwebtoken';
import { config } from '@/config';
import { Effect } from 'effect';
import { redis } from '@/lib/redis';
import { StoreRefreshTokenError } from '@/features/auth/server/auth-errors';

type AccessTokenPayload = {
  userId: string;
  email: string;
  name: string;
};

type RefreshTokenPayload = Pick<AccessTokenPayload, 'userId'> & { jti: string };

type RefreshSession = {
  userId: string;
  jti: string;
};

const PREFIX = 'refresh_token';

export const tokenCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 14,
} as const;

export const createToken = (
  payload: AccessTokenPayload,
): readonly [accessToken: string, refreshToken: string, jti: string] => {
  const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_ACCESS_EXPIRE,
  });

  const jti = crypto.randomUUID();

  const refreshPayload: RefreshTokenPayload = { userId: payload.userId, jti };

  const refreshToken = jwt.sign(refreshPayload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });

  return [accessToken, refreshToken, jti] as const;
};

export const createRefreshToken = (payload: RefreshSession): string => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });
};

export const storeRefreshToken = ({ userId, jti }: RefreshSession) => {
  console.log(userId, jti);

  return Effect.tryPromise({
    try: async () => {
      await redis.set(`${PREFIX}:${jti}`, userId, 'EX', 60 * 60 * 24 * 14);
    },
    catch: (err) => {
      console.error(err);
      return new StoreRefreshTokenError({
        message: 'Failed to store refresh token',
      });
    },
  });
};
