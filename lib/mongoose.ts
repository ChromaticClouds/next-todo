import { config } from '@/config';
import { ApiResponse } from '@/shared/http/api-response';
import mongoose from 'mongoose';

const mongoUrl = config.MONGO_URI;

if (!mongoUrl) throw new Error('MONGO_URL is not defined');

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};

export const mongooseCache = globalCache;

export const connectMongo = async () => {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(mongoUrl);
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
};

type AsyncAction<T> = () => Promise<T>;

export async function withMongo(
  action: AsyncAction<Response>,
): Promise<Response>;

export async function withMongo<T>(
  action: AsyncAction<T>,
  onError: (error: unknown) => T,
): Promise<T>;

export async function withMongo<T>(
  action: AsyncAction<T>,
  onError?: (error: unknown) => T,
): Promise<T> {
  try {
    await connectMongo();
    return await action();
  } catch (error) {
    console.error(error);
    if (onError) return onError(error);
    return ApiResponse.internalServerError('Database connection failed') as T;
  }
}
