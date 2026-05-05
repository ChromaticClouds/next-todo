import { ConsumeTokenError } from '@/features/auth/server/auth-errors';
import { redis } from '@/lib/redis';
import { Effect } from 'effect';

export const consumeOnboardingToken = (token: string) =>
  Effect.tryPromise({
    try: async () => await redis.del(`onboarding:${token}`),
    catch: () => new ConsumeTokenError({ message: 'Token expired.' }),
  });
