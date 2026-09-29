import { config } from '@/config';
import Redis from 'ioredis';

export const redis = new Redis({
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
  username: config.REDIS_USER,
  password: config.REDIS_PASS,
  lazyConnect: true,
});
