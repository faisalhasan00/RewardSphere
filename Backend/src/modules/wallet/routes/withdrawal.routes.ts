import { Router } from 'express';
import { WithdrawalController } from '../controllers/withdrawal.controller';
import { protect as authenticate } from '../../../middlewares/auth.protect';
import { validateRequest } from '../../../core/middleware/validateRequest';
import { RequestWithdrawalSchema, AdminProcessWithdrawalSchema } from '../schemas/withdrawal.schema';

export function createWithdrawalRoutes(withdrawalController: WithdrawalController): Router {
  const router = Router();

  // User Endpoints
  router.get(
    '/dashboard',
    authenticate,
    (req, res) => withdrawalController.getDashboard(req, res)
  );

  router.post(
    '/request',
    authenticate,
    validateRequest(RequestWithdrawalSchema),
    (req, res) => withdrawalController.requestWithdrawal(req, res)
  );

  // Admin Endpoints (In production, these should have 'adminAuthenticate' middleware)
  router.get(
    '/admin/pending',
    authenticate, 
    (req, res) => withdrawalController.adminListPending(req, res)
  );

  router.patch(
    '/admin/process/:id',
    authenticate,
    validateRequest(AdminProcessWithdrawalSchema),
    (req, res) => withdrawalController.adminProcessWithdrawal(req, res)
  );

  return router;
}
