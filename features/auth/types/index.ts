import { Account, User } from "next-auth";

export type OnboardPayload = {
  email: string;
  name: string;
  image: string;
  provider?: 'google';
  providerAccountId?: string;
};

export type OnboardProfilePayload = Pick<OnboardPayload, 'email' | 'name'>;

export type OAuthParams = {
  user: User;
  account: Account | null | undefined;
};

export type OAuthProvider = 'local' | 'google' | 'twitter';

export type RegisterFormValues = {
  name: string;
  passwordHash: string;
} 