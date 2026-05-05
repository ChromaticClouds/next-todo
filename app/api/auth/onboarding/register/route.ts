import { tokenCookieOptions } from '@/features/auth/lib/jwt';
import { authService } from '@/features/auth/server/auth-service';
import { runApiEffect } from '@/lib/effect';
import { withMongo } from '@/lib/mongoose';
import { ApiResponse } from '@/shared/http/api-response';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const cookieStore = await cookies();

  const input = {
    token: cookieStore.get('onboarding_token')?.value,
    name: formData.get('name'),
    imageFile: formData.get('imageFile') ?? undefined,
  };

  return withMongo(() =>
    runApiEffect({
      effect: authService.completeOnboarding(input),
      onSuccess: ({ accessToken, refreshToken, user }) => {
        cookieStore.delete('onboarding_token');

        cookieStore.set('refresh_token', refreshToken, tokenCookieOptions);

        return ApiResponse.ok(
          { accessToken, user },
          'User account successfully created.',
        );
      },
      onError: {
        InvalidProfileFormError: (error) =>
          ApiResponse.badRequest(error.message),
        OnboardingTokenNotFoundError: (error) =>
          ApiResponse.notFound(error.message),
        InvalidOnboardingPayloadError: (error) =>
          ApiResponse.notFound(error.message),
        InvalidProfileImageError: (error) =>
          ApiResponse.badRequest(error.message),
      },
      onUnexpectedError: (error) => {
        console.error(error);
        return ApiResponse.internalServerError(
          error.message || 'Unexpected server error',
        );
      },
    }),
  );
};
