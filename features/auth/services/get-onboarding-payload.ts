import { onboardSchema } from '@/features/auth/schemas/auth-schema';
import { redis } from '@/lib/redis';
import { Effect } from 'effect';
import {
  InvalidOnboardingPayloadError,
  OnboardingTokenNotFoundError,
} from '@/features/auth/server/auth-errors';

export const getOnboardingPayload = (token: string) =>
  Effect.tryPromise({
    try: async () => {
      const payload = await redis.get(`onboarding:${token}`);

      if (!payload)
        throw new OnboardingTokenNotFoundError({
          message: 'Not found or expired session.',
        });

      const parsed =
        typeof payload === 'string' ? JSON.parse(payload) : payload;

      const result = onboardSchema.safeParse(parsed);

      if (!result.success)
        throw new InvalidOnboardingPayloadError({
          message: 'Not found or expired session.',
        });

      const { email, provider, providerAccountId } = result.data;

      return { email, provider, providerAccountId };
    },
    catch: (error) => {
      if (
        error instanceof OnboardingTokenNotFoundError ||
        error instanceof InvalidOnboardingPayloadError
      )
        return error;

      return new InvalidOnboardingPayloadError({
        message: 'Not found or expired session.',
      });
    },
  });
