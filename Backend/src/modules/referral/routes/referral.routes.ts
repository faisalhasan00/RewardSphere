import { Router } from 'express';
import { ReferralController } from '../controllers/referral.controller';
import { protect } from '../../../middlewares/auth.protect';

export function createReferralRoutes(referralController: ReferralController): Router {
  const router = Router();

  router.get(
    '/stats',
    protect,
    (req, res) => referralController.getMyStats(req, res)
  );

  return router;
}
