import { Router } from 'express';
import { TrackingController } from '../controllers/tracking.controller';
import { validateRequest } from '../../../core/middleware/validateRequest';
import { RedirectQuerySchema } from '../schemas/tracking.schema';

export const createTrackingRouter = (trackingController: TrackingController): Router => {
  const router = Router();

  /**
   * Redirect to Store Affiliate Route
   * URL Example: /api/v1/tracking/redirect/store_uuid?dealId=deal_uuid
   */
  router.get(
    '/redirect/:storeId',
    validateRequest(RedirectQuerySchema, 'query'),
    trackingController.handleRedirect
  );

  /**
   * Postback Webhook
   * URL Example: /api/v1/tracking/postback/cuelinks?secret=xyz&click_id=...&amount=...
   * Note: Some networks use GET, some use POST, so we accept both.
   */
  router.get('/postback/:networkSlug', trackingController.handlePostback);
  router.post('/postback/:networkSlug', trackingController.handlePostback);

  return router;
};
