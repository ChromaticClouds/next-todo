import jwt from 'jsonwebtoken';
import { config } from '@/config';
import { Effect } from 'effect';
import { redis } from '@/lib/redis';
import { StoreRefreshTokenError } from '@/features/auth/server/auth-errors';

export type AccessTokenPayload = {
  userId: string;
};

export type RefreshTokenPayload = AccessTokenPayload & { jti: string };

type RefreshSession = {
  userId: string;
  jti: string;
};

const PREFIX = 'refresh_token';

const baseTokenCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
} as const;

export const accessTokenCookieOptions = baseTokenCookieOptions;

export const refreshTokenCookieOptions = {
  ...baseTokenCookieOptions,
  maxAge: 60 * 60 * 24 * 14,
} as const;

const isPayload = (value: string | jwt.JwtPayload): value is jwt.JwtPayload =>
  typeof value === 'object' && value !== null;

export const createAccessToken = (payload: AccessTokenPayload): string =>
  jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    algorithm: 'HS256',
    expiresIn: config.JWT_ACCESS_EXPIRE,
  });

export const createToken = (
  payload: AccessTokenPayload,
): readonly [accessToken: string, refreshToken: string, jti: string] => {
  const accessToken = createAccessToken(payload);

  const jti = crypto.randomUUID();

  const refreshPayload: RefreshTokenPayload = { userId: payload.userId, jti };

  const refreshToken = jwt.sign(refreshPayload, config.JWT_REFRESH_SECRET, {
    algorithm: 'HS256',
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });

  return [accessToken, refreshToken, jti] as const;
};

export const createRefreshToken = (payload: RefreshSession): string => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    algorithm: 'HS256',
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  const payload = jwt.verify(token, config.JWT_ACCESS_SECRET, {
    algorithms: ['HS256'],
  });

  if (!isPayload(payload) || typeof payload.userId !== 'string')
    throw new Error('Invalid access token payload');

  return { userId: payload.userId };
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  const payload = jwt.verify(token, config.JWT_REFRESH_SECRET, {
    algorithms: ['HS256'],
  });

  if (
    !isPayload(payload) ||
    typeof payload.userId !== 'string' ||
    typeof payload.jti !== 'string'
  )
    throw new Error('Invalid refresh token payload');

  return { userId: payload.userId, jti: payload.jti };
};

export const hasRefreshSession = async ({ userId, jti }: RefreshSession) => {
  const storedUserId = await redis.get(`${PREFIX}:${jti}`);
  return storedUserId === userId;
};

export const storeRefreshToken = ({ userId, jti }: RefreshSession) => {
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
