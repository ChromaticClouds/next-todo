import { registerBodySchema } from '@/features/auth/schemas/auth-schema';
import { ValidationError } from '@/shared/errors/global-error';
import { Effect } from 'effect';
import { z } from 'zod';

export const validateRegisterBody = (body: unknown) =>
  Effect.gen(function* () {
    const parsed = registerBodySchema.safeParse(body);

    if (!parsed.success) {
      yield* Effect.fail(
        new ValidationError({
          issues: z.flattenError(parsed.error),
        }),
      );
    }

    return parsed.data!;
  });
