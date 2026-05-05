import { SupabaseError } from '@/features/auth/server/auth-errors';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Effect } from 'effect';

type BucketNameUnion = 'avatars';

export const getSignedUrl = (
  filePath: string | undefined,
  bucketName: BucketNameUnion,
  expiresInSeconds = 60,
) =>
  Effect.tryPromise({
    try: async () => {
      if (!filePath) return undefined;

      const { data, error } = await supabaseAdmin.storage
        .from(bucketName)
        .createSignedUrl(filePath, expiresInSeconds);

      if (error) {
        console.error('Error creating signed URL: ', error);
        return undefined;
      }

      return data.signedUrl;
    },
    catch: () => new SupabaseError({ message: 'Internal server error' }),
  });
