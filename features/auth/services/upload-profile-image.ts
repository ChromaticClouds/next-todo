import {
  InvalidProfileImageError,
  UploadProfileImageError,
} from '@/features/auth/server/auth-errors';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/features/user/constants';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Effect } from 'effect';

const extensionMap: Record<string, string> = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

export const uploadProfileImage = (
  providerAccountId: string,
  file: File | undefined,
) =>
  Effect.gen(function* () {
    if (!file) return undefined;

    if (file.size <= 0)
      return yield* Effect.fail(
        new InvalidProfileImageError({
          message: 'Empty image file.',
        }),
      );

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type))
      return yield* Effect.fail(
        new InvalidProfileImageError({
          message: 'Unsupported image type.',
        }),
      );

    if (file.size > MAX_FILE_SIZE)
      return yield* Effect.fail(
        new InvalidProfileImageError({
          message: 'Image size exceeds limit.',
        }),
      );

    const extension = extensionMap[file.type] || 'bin';

    const fileName = `${crypto.randomUUID()}.${extension}`;
    const path = `${providerAccountId}/${fileName}`;

    const result = yield* Effect.tryPromise({
      try: async () =>
        supabaseAdmin.storage.from('avatars').upload(path, file, {
          upsert: false,
          contentType: file.type,
        }),
      catch: () =>
        new UploadProfileImageError({
          message: 'Failed to upload profile image.',
        }),
    });

    if (result.error)
      return yield* Effect.fail(
        new UploadProfileImageError({
          message: result.error.message,
        }),
      );

    return path;
  });
