import Redis from 'ioredis';
import { config } from '../../config';
import { logger } from '../logger';

const redis = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD || undefined,
  lazyConnect: true,
});

redis.on('connect', () => logger.info('🔗 Connected to Redis'));
redis.on('error', (err) => logger.error('❌ Redis Connection Error:', err));

export default redis;
export { redis };
