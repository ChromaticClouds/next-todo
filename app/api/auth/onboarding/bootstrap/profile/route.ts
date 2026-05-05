import { onboardProfileSchema } from '@/features/auth/schemas/auth-schema';
import { redis } from '@/lib/redis';
import { ApiResponse } from '@/shared/http/api-response';
import { safeJsonParse } from '@/shared/safe-json-parse';
import { cookies } from 'next/headers';

const ONBOARD_PREFIX = 'onboarding';

export const runtime = 'nodejs';

export const GET = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('onboarding_token')?.value;

  if (!token) return ApiResponse.notFound('Not found onboarding token');

  const payload = await redis.get(`${ONBOARD_PREFIX}:${token}`);

  if (!payload) return ApiResponse.notFound('Not found user data');

  const json = safeJsonParse(payload);
  if (!json)
    return ApiResponse.internalServerError('Invalid onboarding payload');

  const result = onboardProfileSchema.safeParse(json);
  if (!result.success)
    return ApiResponse.internalServerError('Invalid onboarding payload');

  return ApiResponse.ok(result.data);
};
