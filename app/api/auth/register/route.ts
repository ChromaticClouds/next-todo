import { config } from '@/config';
import { authService } from '@/features/auth/server/auth-service';
import { runApiEffect } from '@/lib/effect';
import { ApiResponse } from '@/shared/http/api-response';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const cookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: config.MAIL_EXPIRE,
} as const;

export const POST = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const body = await request.json();

  return runApiEffect({
    effect: authService.register(body),
    onSuccess: (token) => {
      cookieStore.set(config.EMAIL_TOKEN_PREFIX, token, cookieOptions);
      return ApiResponse.ok();
    },
    onError: {
      ValidationError: ({ issues }) =>
        ApiResponse.badRequest('Invalid input values', issues),
      OtpStoreError: (error) => ApiResponse.internalServerError(error.message),
      MailSendError: (error) => ApiResponse.internalServerError(error.message),
    },
  });
};
