import crypto from 'crypto';
import { TrackingRepository } from '../repositories/tracking.repository';
import { StoreRepository } from '../../store/repositories/store.repository';
import { DealRepository } from '../../deal/repositories/deal.repository';
import { MoneyUtil } from '../../../core/utils/money';
import { redis } from '../../../core/db/redis';
import { logger } from '../../../core/logger';
import { config } from '../../../config';
import { AppError } from '../../../core/errors/AppError';
import { PostbackPayload } from '../schemas/tracking.schema';

export class TrackingService {
  constructor(
    private readonly trackingRepository: TrackingRepository,
    private readonly storeRepository: StoreRepository,
    private readonly dealRepository: DealRepository
  ) {}

  /**
   * Generates tracking click, increments Redis sorted set metrics, 
   * applies rate limits, and constructs final affiliate URL.
   */
  async processRedirect(data: {
    ip: string;
    userAgent: string;
    userId?: string | undefined;
    sessionId: string;
    storeId: string;
    dealId?: string | undefined;
  }): Promise<string> {
    const { ip, userAgent, userId, sessionId, storeId, dealId } = data;

    // 1. Fetch Store to construct Affiliate Link
    const store = await this.storeRepository.findById(storeId);
    if (!store) throw AppError.notFound('Store not found.');
    if (!store.affiliateUrl) throw AppError.badRequest('Store has no affiliate URL configured.');

    // 2. Validate Deal if provided
    if (dealId) {
      const deal = await this.dealRepository.findById(dealId);
      if (!deal) throw AppError.notFound('Deal not found.');
    }

    // 3. Rate Limiting via Redis
    await this.checkRateLimits(ip, sessionId, dealId || storeId);

    // 4. Generate Click ID (subid)
    const clickId = crypto.randomUUID();

    // 5. Fail-Safe Database Write & Redis Trending
    try {
      await this.trackingRepository.createClick({
        clickId,
        storeId,
        dealId: dealId || undefined,
        userId: userId || undefined,
        sessionId,
        ipAddress: ip,
        userAgent,
      });

      // Update Trending metrics in Redis Sorted Sets
      const now = Date.now();
      const redisKey = dealId ? `trending:clicks:deal:${dealId}` : `trending:clicks:store:${storeId}`;
      await redis.zadd(redisKey, now, clickId);

      // Log structured
      logger.info(JSON.stringify({ event: 'CLICK_GENERATED', log: 'TRACKING', clickId, storeId, dealId, userId, sessionId }));
    } catch (error) {
      // 6. Fail-Safe: Log but DON'T disrupt redirect
      logger.error('Database/Redis write failed during redirect. Passing through.', error);
    }

    // 7. Construct Link (Assuming Cuelinks expects &subid= UUID)
    // Needs proper URL parsing in case the base already has params.
    const url = new URL(store.affiliateUrl);
    url.searchParams.append('subid', clickId);

    return url.toString();
  }

  /**
   * Ensures User & IP are not clicking excessively.
   */
  private async checkRateLimits(ip: string, sessionId: string, entityId: string) {
    const multi = redis.multi();

    const ipMinKey = `ratelimit:click:ip:min:${ip}`;
    const ipHrKey = `ratelimit:click:ip:hr:${ip}`;
    const sessionEntityKey = `ratelimit:click:session:${sessionId}:entity:${entityId}`;

    multi.incr(ipMinKey);
    multi.expire(ipMinKey, 60, 'NX');

    multi.incr(ipHrKey);
    multi.expire(ipHrKey, 3600, 'NX');

    multi.incr(sessionEntityKey);
    multi.expire(sessionEntityKey, 60, 'NX');

    const results = (await multi.exec()) as [Error | null, any][] | null;
    if (!results || results.length < 5) throw new Error('Redis transaction failed.');

    const ipMinCount = (results?.[0]?.[1] as number) || 0;
    const ipHrCount = (results?.[2]?.[1] as number) || 0;
    const sessionCount = (results?.[4]?.[1] as number) || 0;

    if (ipMinCount > 20) throw AppError.tooManyRequests('Too many requests per minute from this IP.');
    if (ipHrCount > 200) throw AppError.tooManyRequests('Too many requests per hour from this IP.');
    if (sessionCount > 10) throw AppError.tooManyRequests('You are generating too many clicks for this item.');
  }

  /**
   * Postback Handler
   */
  async processPostback(networkSlug: string, payload: PostbackPayload) {
    // Basic verification of anomaly in payload (e.g., extremely long txn id)
    if (payload.txn_id && payload.txn_id.length > 100) {
      logger.warn(`Anomalous Transaction ID detected from ${networkSlug}: ${payload.txn_id}`);
    }

    // In a real app we'd fetch Network dynamically by slug. 
    // Hardcoding 'cuelinks-network-id' for simulation as per Phase 1 scope.
    const mockNetworkId = process.env.CUELINKS_NETWORK_ID || 'cuelinks-mock-id';

    const click = await this.trackingRepository.findClickBySubId(payload.click_id);

    if (!click || !click.userId) {
      // Unmatched or Guest Click that never logged in
      logger.warn({ event: 'UNMATCHED_CONVERSION_SAVED', log: 'TRACKING', clickId: payload.click_id, payload });
      await this.trackingRepository.saveUnmatchedConversion({
        networkId: mockNetworkId,
        networkTransactionId: payload.txn_id,
        clickId: payload.click_id,
        payload,
      });
      return { status: 'unmatched_saved' };
    }

    // Map Statuses
    let internalStatus = 'PENDING';
    if (payload.status.toLowerCase() === 'approved') internalStatus = 'CONFIRMED';
    if (payload.status.toLowerCase() === 'rejected') internalStatus = 'REJECTED';

    const payableAt = new Date();
    payableAt.setDate(payableAt.getDate() + config.CASHBACK_PAYABLE_DAYS);

    // Convert decimal payload amounts to paise (BigInt)
    const orderAmountPaise = MoneyUtil.toPaise(payload.amount);
    const networkCommissionPaise = MoneyUtil.toPaise(payload.payout || 0);

    // Calculate user's share (30%, rounded down)
    const userCashbackPaise = MoneyUtil.calculateUserCashback(networkCommissionPaise);

    await this.trackingRepository.upsertConversion({
      clickId: click.id,
      userId: click.userId,
      storeId: click.storeId,
      networkId: mockNetworkId,
      networkTransactionId: payload.txn_id,
      orderAmount: orderAmountPaise, 
      networkCommission: networkCommissionPaise,
      cashbackAmount: userCashbackPaise,
      status: internalStatus as any,
      payableAt,
    });

    logger.info({ event: 'CONVERSION_PROCESSED', log: 'TRACKING', clickId: click.id, internalStatus });
    return { status: 'success' };
  }
}
