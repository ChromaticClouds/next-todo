import { FindUserError } from '@/features/auth/server/auth-errors';
import { UserModel } from '@/features/user/server/user-model';
import { storeOAuthHandoff } from '@/features/auth/services/oauth-handoff';
import { Effect } from 'effect';
import { Account, User } from 'next-auth';

type OAuthParams = {
  user: User;
  account: Account | null | undefined;
};

export const validateExistingUser = ({ user, account }: OAuthParams) =>
  Effect.tryPromise({
    try: async () => {
      const email = user.email?.toLowerCase().trim();
      if (!email) return '/login?error=no_email' as const;

      const existingUser = await UserModel.findOne({
        provider: account?.provider,
        providerAccountId: account?.providerAccountId,
      }).lean();

      if (existingUser) {
        const handoffToken = await storeOAuthHandoff(
          existingUser._id.toString(),
        );

        return `/api/auth/oauth/success/${handoffToken}` as const;
      }
    },
    catch: () => new FindUserError({ message: 'Not found user' }),
  });
