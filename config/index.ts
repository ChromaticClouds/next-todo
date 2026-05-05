import { StringValue } from 'ms';

export const config = {
  APP_BASE_URL: process.env.APP_BASE_URL!,
  NODE_ENV: process.env.NODE_ENV,

  MONGO_URI: process.env.MONGO_URI,

  AUTH_SECRET: process.env.AUTH_SECRET!,
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID!,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET!,

  REDIS_USER: process.env.REDIS_USER,
  REDIS_PASS: process.env.REDIS_PASS,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,

  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,

  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE! as StringValue,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE! as StringValue,

  MAIL_PREFIX: process.env.MAIL_PREFIX,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_EXPIRE: 60 * 30,

  EMAIL_TOKEN_PREFIX: 'email_token',
};
