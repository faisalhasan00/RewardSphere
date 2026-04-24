import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { TrackingService } from '../services/tracking.service';
import { PostbackPayloadSchema, RedirectQuerySchema } from '../schemas/tracking.schema';
import { HttpCode, AppError } from '../../../core/errors/AppError';
import { config } from '../../../config';
import { logger } from '../../../core/logger';

export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  public handleRedirect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const { dealId } = req.query as { dealId?: string }; // from schema ideally

      // 1. Identify User / Session
      let userId: string | undefined = (req as any).user?.id;
      let sessionId: string;

      if (userId) {
        // If logged in, generate a random sessionId or use their auth context,
        // but typically userId takes precedence in DB.
        sessionId = `usr_${userId}`; 
      } else {
        // Guest Flow
        sessionId = req.cookies?.anonymous_id as string;
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          // Set an HTTP-only cookie representing the guest session
          res.cookie('anonymous_id', sessionId, {
            httpOnly: true,
            secure: config.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
          });
        }
      }

      // 2. Extract Request Context
      const ip = (req.ip || req.connection.remoteAddress || 'unknown').toString();
      const userAgent = (req.headers['user-agent'] || 'unknown').toString();

      // 3. Process Tracking & Get Destination URL
      const redirectUrl = await this.trackingService.processRedirect({
        ip,
        userAgent,
        userId,
        sessionId,
        storeId: storeId as string,
        dealId: dealId ? (dealId as string) : undefined,
      });

      // 4. Redirect
      res.redirect(302, redirectUrl);

    } catch (error) {
      next(error);
    }
  };

  public handlePostback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const networkSlug = req.params.networkSlug; // e.g. cuelinks

      // 1. Verify Secret Token
      const token = req.query.secret;
      if (!token || token !== config.POSTBACK_SECRET_TOKEN) {
        logger.warn(`Unauthorized postback attempt from IP: ${String(req.ip)}`);
        throw AppError.unauthorized('Invalid or missing secret token.');
      }

      // 2. Extract and Validate Payload (Can arrive via GET query or POST body depending on network, typically GET for Cuelinks)
      const rawPayload = Object.keys(req.body).length > 0 ? req.body : req.query;
      
      const parsedPayload = PostbackPayloadSchema.safeParse(rawPayload);
      if (!parsedPayload.success) {
        throw AppError.badRequest(`Invalid postback payload: ${parsedPayload.error.message}`);
      }

      // 3. Process
      const result = await this.trackingService.processPostback(networkSlug as string, parsedPayload.data);

      res.status(HttpCode.OK).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  };
}
