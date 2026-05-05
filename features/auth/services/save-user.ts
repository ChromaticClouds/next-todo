import { onboardPayloadSchema } from '@/features/auth/schemas/auth-schema';
import { SaveUserError } from '@/features/auth/server/auth-errors';
import { UserModel } from '@/features/user/server/user-model';
import { Effect } from 'effect';
import { z } from 'zod';

type ProfileParams = z.infer<typeof onboardPayloadSchema> & {
  name: string;
  imagePath: string | undefined;
};

export const saveUser = (params: ProfileParams) =>
  Effect.tryPromise({
    try: async () => {
      console.log(params);
      return await new UserModel(params).save();
    },
    catch: (err) => {
      console.error(err);
      return new SaveUserError({
        message: 'Saving user is failed',
      });
    },
  });
