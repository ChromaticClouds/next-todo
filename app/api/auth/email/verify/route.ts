import { config } from '@/config';
import { otpSchema } from '@/features/auth/schemas/auth-schema';
import { authService } from '@/features/auth/server/auth-service';
import { runApiEffect } from '@/lib/effect';
import { withMongo } from '@/lib/mongoose';
import { ApiResponse } from '@/shared/http/api-response';
import { NextRequest } from 'next/server';

export const GET = (request: NextRequest) => {
  const token = request.cookies.get(config.EMAIL_TOKEN_PREFIX)?.value;
  if (!token) return ApiResponse.badRequest('Session expired');

  return runApiEffect({
    effect: authService.getEmail(token),
    onSuccess: (email) => ApiResponse.ok(email),
  });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const token = request.cookies.get(config.EMAIL_TOKEN_PREFIX)?.value;

  if (!token) return ApiResponse.badRequest('Invalid request');

  const parsed = otpSchema.safeParse(body);
  if (!parsed.success) return ApiResponse.badRequest(parsed.error.message);

  const { otp } = parsed.data;

  return withMongo(() =>
    runApiEffect({
      effect: authService.verifyOtp(otp, token),
      onSuccess: () => ApiResponse.ok(null),
      onError: {
        NotFoundEmailError: (error) => ApiResponse.notFound(error.message),
        OtpStoreError: (error) =>
          ApiResponse.internalServerError(error.message),
        InvalidOtpError: (error) => ApiResponse.badRequest(error.message),
        FindUserError: (error) =>
          ApiResponse.internalServerError(error.message),
        UserAlreadyExistsError: (error) => ApiResponse.conflict(error.message),
        SaveUserError: (error) =>
          ApiResponse.internalServerError(error.message),
      },
    }),
  );
};
