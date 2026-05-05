import { loginSchema, registerSchema } from '@/features/auth/schemas/auth-schema';
import { OnboardProfilePayload } from '@/features/auth/types';
import { api } from '@/services/api';
import z from 'zod';

type ApiResponse<T = unknown> = {
  message?: string;
  data?: T extends void ? never : T;
};

export const authApi = {
  getOnboardProfile: () =>
    api
      .get('auth/onboarding/bootstrap/profile')
      .json<ApiResponse<OnboardProfilePayload>>(),
  postProfile: (form: FormData) =>
    api.post('auth/onboarding/register', { body: form }).json<ApiResponse>(),
  postRegisterForm: (form: z.infer<typeof registerSchema>) =>
    api.post('auth/register', { json: form }).json(),
  getEmail: () => api.get('auth/email/verify').json<ApiResponse<string>>(),
  postOtp: (form: { otp: string }) =>
    api.post('auth/email/verify', { json: form }).json(),
  postLoginForm: (form: z.infer<typeof loginSchema>) =>
    api.post('auth/login', { json: form }).json(),
};
