import bcrypt from 'bcrypt';
import { config } from '@/config';
import { createToken, storeRefreshToken } from '@/features/auth/lib/jwt';
import {
  CompleteOnboardingError,
  FindUserError,
  InvalidOtpError,
  MailSendError,
  NotFoundEmailError,
  OnboardingTokenNotFoundError,
  OtpStoreError,
  SaveUserError,
  UserAlreadyExistsError,
} from '@/features/auth/server/auth-errors';
import { consumeOnboardingToken } from '@/features/auth/services/consume-onboarding-token';
import { getOnboardingPayload } from '@/features/auth/services/get-onboarding-payload';
import { saveUser } from '@/features/auth/services/save-user';
import { storeOnboarding } from '@/features/auth/services/store-onboarding';
import { uploadProfileImage } from '@/features/auth/services/upload-profile-image';
import { validateExistingUser } from '@/features/auth/services/validate-existing-user';
import { validateProfileForm } from '@/features/auth/services/validate-profile-form';
import { validateRegisterBody } from '@/features/auth/services/validate-register-body';
import { RegisterFormValues } from '@/features/auth/types';
import { UserModel } from '@/features/user/server/user-model';
import { createMailOptions, transporter } from '@/lib/nodemailer';
import { redis } from '@/lib/redis';
import { getSignedUrl } from '@/lib/supabase/supabase';
import { randomInt, randomUUID } from 'crypto';
import { Effect } from 'effect';
import { Account, User } from 'next-auth';

type OAuthParams = {
  user: User;
  account: Account | null | undefined;
};

type CompleteOnboardingInput = {
  token?: string;
  name: unknown;
  imageFile: unknown;
};

type UserResponse = {
  userId: string;
  name: string;
  email: string;
  image: string | undefined;
};

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
};

export const authService = {
  oauthSignIn: (params: OAuthParams) =>
    Effect.gen(function* () {
      const redirect = yield* validateExistingUser(params);

      if (redirect) return redirect;

      const onboardingToken = randomUUID();

      yield* storeOnboarding(onboardingToken, params);

      return `/api/auth/onboarding/bootstrap?token=${onboardingToken}` as const;
    }),

  completeOnboarding: (
    input: unknown,
  ): Effect.Effect<AuthResponse, CompleteOnboardingError, never> =>
    Effect.gen(function* () {
      const { token, ...rawProfile } = input as CompleteOnboardingInput;

      if (!token)
        return yield* Effect.fail(
          new OnboardingTokenNotFoundError({
            message: 'Not found or expired session.',
          }),
        );

      const parsedBody = yield* validateProfileForm(rawProfile);
      const onboardingPayload = yield* getOnboardingPayload(token);

      const imagePath = yield* uploadProfileImage(
        onboardingPayload.providerAccountId,
        parsedBody.imageFile,
      );

      const user = yield* saveUser({
        ...onboardingPayload,
        imagePath,
        name: parsedBody.name,
      });

      const { id: userId, email, name } = user;

      const [accessToken, refreshToken, jti] = createToken({
        userId,
        email,
        name,
      });

      const image = yield* getSignedUrl(imagePath, 'avatars');

      const userResponse = {
        userId,
        name,
        email,
        image,
      };

      yield* storeRefreshToken({ userId, jti });

      yield* consumeOnboardingToken(token);

      return { accessToken, refreshToken, user: userResponse };
    }),

  register: (body: unknown) =>
    Effect.gen(function* async() {
      const { email, name, password } = yield* validateRegisterBody(body);

      const token = randomUUID();
      const code = randomInt(0, 1000000).toString().padStart(6, '0');
      const tokenKey = `${config.MAIL_PREFIX}:token:${token}`;
      const otpKey = `${config.MAIL_PREFIX}:otp:${token}:${code}`;

      yield* Effect.tryPromise({
        try: async () => {
          const passwordHash = await bcrypt.hash(password, 12);

          await redis.set(tokenKey, email, 'EX', config.MAIL_EXPIRE);

          await redis.set(
            otpKey,
            JSON.stringify({ name, passwordHash }),
            'EX',
            config.MAIL_EXPIRE,
          );
        },
        catch: () =>
          new OtpStoreError({
            message: 'Internal server error.',
          }),
      });

      yield* Effect.tryPromise({
        try: async () => transporter.sendMail(createMailOptions(email, code)),
        catch: () =>
          new MailSendError({
            message: 'Sending mail is failed',
          }),
      });

      return token;
    }),

  getEmail: (token: string) =>
    Effect.gen(function* () {
      const email = yield* Effect.tryPromise({
        try: async () =>
          await redis.get(`${config.MAIL_PREFIX}:token:${token}`),
        catch: () => new OtpStoreError({ message: 'Session expired' }),
      });

      if (!email)
        yield* Effect.fail(
          new NotFoundEmailError({ message: 'Not found email' }),
        );

      return email!;
    }),

  verifyOtp: (otp: string, token: string) =>
    Effect.gen(function* () {
      const email = yield* Effect.tryPromise({
        try: async () =>
          await redis.get(`${config.MAIL_PREFIX}:token:${token}`),
        catch: () => new OtpStoreError({ message: 'Session expired' }),
      });

      if (!email)
        yield* Effect.fail(
          new NotFoundEmailError({ message: 'Not found email' }),
        );

      const data = yield* Effect.tryPromise({
        try: async () =>
          await redis.get(`${config.MAIL_PREFIX}:otp:${token}:${otp}`),
        catch: () => new OtpStoreError({ message: 'Session expired' }),
      });

      if (!data) {
        yield* Effect.fail(
          new InvalidOtpError({ message: 'Invalid or expired OTP' }),
        );
      }

      const parsed = JSON.parse(data!) as RegisterFormValues;

      const existingUser = yield* Effect.tryPromise({
        try: async () => UserModel.findOne({ provider: 'local', email }).lean(),
        catch: () => new FindUserError({ message: 'Find user failed' }),
      });

      if (existingUser) {
        yield* Effect.fail(
          new UserAlreadyExistsError({ message: 'User already exists' }),
        );
      }

      yield* Effect.tryPromise({
        try: async () =>
          await new UserModel({ provider: 'local', email, ...parsed }).save(),
        catch: (err) => {
          console.error(err);
          return new SaveUserError({ message: 'Save User Error' });
        },
      });

      yield* Effect.tryPromise({
        try: async () =>
          await redis.del(
            `${config.MAIL_PREFIX}:token:${token}`,
            `${config.MAIL_PREFIX}:otp:${token}:${otp}`,
          ),
        catch: () =>
          new OtpStoreError({ message: 'Failed to cleanup session' }),
      });
    }),
};
