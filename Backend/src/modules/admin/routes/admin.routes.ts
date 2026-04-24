import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { protect, authorize } from '../../../middlewares/auth.protect';
import { UserRole } from '@prisma/client';

export function createAdminRoutes(adminController: AdminController): Router {
  const router = Router();

  // Apply GLOBAL admin protection to all routes in this router
  router.use(protect);
  router.use(authorize(UserRole.ADMIN));

  router.get('/dashboard', (req, res) => adminController.getStats(req, res));
  
  router.get('/users', (req, res) => adminController.getUsers(req, res));
  
  router.post('/withdrawals/:id/process', (req, res) => adminController.processWithdrawal(req, res));

  return router;
}
