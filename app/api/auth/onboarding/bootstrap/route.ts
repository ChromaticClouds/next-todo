import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { config } from '@/config';

export const runtime = 'nodejs';

export const GET = async (request: NextRequest) => {
  const token = request.nextUrl.searchParams.get('token');

  if (!token)
    return NextResponse.redirect(
      new URL('/login?error=invalid_onboarding', request.url),
    );

  const exists = await redis.get(`onboarding:${token}`);

  if (!exists)
    return NextResponse.redirect(
      new URL('/login?error=expired_onboarding', request.url),
    );

  const response = NextResponse.redirect(
    new URL('/onboard/profile', request.url),
  );

  response.cookies.set('onboarding_token', token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
}
