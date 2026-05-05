import { z } from 'zod';

export const onboardSchema = z.object({
  email: z.email(),
  name: z.string().trim(),
  image: z.url().optional().or(z.literal('')),
  provider: z.enum(['google']),
  providerAccountId: z.string().min(1),
});

export const onboardProfileSchema = onboardSchema.pick({
  email: true,
  name: true,
  image: true,
});

export const onboardPayloadSchema = onboardSchema.pick({
  email: true,
  provider: true,
  providerAccountId: true,
});

const registerBaseSchema = z.object({
  name: z
    .string()
    .min(1, 'Enter the name.')
    .max(20, 'Enter the name under 20 letters.'),
  email: z.email('Invalid email format.'),
  password: z
    .string()
    .min(8, 'Password have to be longer than 8 letters')
    .max(100),
  confirmPassword: z.string(),
});

export const loginSchema = z.object({
  email: z.string().min(1, 'Enter the email'),
  password: z.string().min(1, 'Enter the password'),
});

export const registerSchema = registerBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: 'Incorrect password.',
  },
);

export const registerBodySchema = registerBaseSchema.pick({
  name: true,
  email: true,
  password: true,
});

export const otpSchema = z.object({
  otp: z.string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),
});
