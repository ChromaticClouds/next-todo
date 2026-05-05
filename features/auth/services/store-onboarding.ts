import { SaveOnboardingError } from '@/features/auth/server/auth-errors';
import { OAuthParams } from '@/features/auth/types';
import { redis } from '@/lib/redis';
import { Effect } from 'effect';

const createOnboardPayload = ({ user, account }: OAuthParams) => ({
  email: user.email,
  name: user.name,
  image: user.image,
  provider: account?.provider,
  providerAccountId: account?.providerAccountId,
});

export const storeOnboarding = (token: string, params: OAuthParams) =>
  Effect.tryPromise({
    try: () =>
      redis.set(
        `onboarding:${token}`,
        JSON.stringify(createOnboardPayload(params)),
        'EX',
        60 * 60,
      ),
    catch: () => new SaveOnboardingError(),
  });
