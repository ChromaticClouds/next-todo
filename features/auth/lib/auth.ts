/**
 * Node modules
 */
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

/**
 * Custom modules
 */
import { config } from '@/config';
import { runEffect } from '@/lib/effect';
import { authService } from '@/features/auth/server/auth-service';
import { withMongo } from '@/lib/mongoose';

export const { handlers, auth } = NextAuth({
  providers: [
    Google({
      clientId: config.AUTH_GOOGLE_ID,
      clientSecret: config.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) =>
      await withMongo(
        () =>
          runEffect({
            effect: authService.oauthSignIn({ user, account }),
            onSuccess: (result) => result,
            onUnexpectedError: () => '/login?error=internal_error',
          }),
        () => '/login?error=internal_error',
      ),
  },
  pages: { error: '/auth/error' },
});
