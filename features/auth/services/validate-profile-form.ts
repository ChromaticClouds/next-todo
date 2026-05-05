import { InvalidProfileFormError } from '@/features/auth/server/auth-errors';
import { profileFormSchema } from '@/features/user/schema/profile-schema';
import { Effect } from 'effect';

export const validateProfileForm = (input: unknown) =>
  Effect.try({
    try: () => {
      const result = profileFormSchema.safeParse(input);
      if (!result.success)
        throw new InvalidProfileFormError({
          message: 'Invalid profile form input.',
        });

      return result.data;
    },
    catch: (error) =>
      error instanceof InvalidProfileFormError
        ? error
        : new InvalidProfileFormError({
            message: 'Invalid profile form format.',
          }),
  });
