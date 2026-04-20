import { Router } from 'express';
import { container } from '../../../core/container';

const router = Router();
const cashbackController = container.cashbackController;

// Admin Routes (Should have admin middleware in real app)
router.patch('/admin/update-status/:id', cashbackController.updateStatus);
router.post('/admin/trigger-batch', cashbackController.triggerMaturityBatch);

// User Routes
router.get('/history', cashbackController.getMyHistory);

export default router;
