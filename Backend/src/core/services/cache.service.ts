import { redis } from '../db/redis';
import { logger } from '../logger';

export enum CacheTTL {
  DEAL_LISTING = 300,        // 5 mins
  DEAL_SINGLE = 600,         // 10 mins
  STORE_LISTING = 3600,      // 60 mins
}

export class CacheService {
  public async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      logger.error(`Cache Get Error [${key}]:`, error);
      return null;
    }
  }

  public async set(key: string, value: any, ttlSeconds: number): Promise<void> {
    try {
      const data = JSON.stringify(value);
      await redis.set(key, data, 'EX', ttlSeconds);
    } catch (error) {
      logger.error(`Cache Set Error [${key}]:`, error);
    }
  }

  public async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      logger.error(`Cache Del Error [${key}]:`, error);
    }
  }

  public async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
        logger.info(`Invalidated ${keys.length} keys matching ${pattern}`);
      }
    } catch (error) {
      logger.error(`Cache Invalidation Error [${pattern}]:`, error);
    }
  }
}

export const cacheService = new CacheService();
