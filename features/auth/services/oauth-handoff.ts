import { redis } from '@/lib/redis';
import { randomUUID } from 'crypto';

const PREFIX = 'oauth_handoff';
const EXPIRES_IN_SECONDS = 60;

export const storeOAuthHandoff = async (userId: string) => {
  const token = randomUUID();

  await redis.set(`${PREFIX}:${token}`, userId, 'EX', EXPIRES_IN_SECONDS);

  return token;
};

export const consumeOAuthHandoff = (token: string) =>
  redis.getdel(`${PREFIX}:${token}`);
