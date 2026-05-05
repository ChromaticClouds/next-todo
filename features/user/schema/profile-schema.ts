import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/features/user/constants';
import { z } from 'zod';

const imageSchema = z
  .instanceof(File, { message: 'File is required.' })
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png, and .webp formats are accepted.',
  );

export const profileSchema = z.object({
  email: z.email(),
  name: z.string().min(1).max(50),
  imageFile: imageSchema.optional(),
});

export const profileFormSchema = profileSchema.pick({
  name: true,
  imageFile: true,
});
