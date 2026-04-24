import { Router } from 'express';
import { container } from '../../../core/container';
import { validate } from '../../../middlewares/validation/validate';
import { createDealSchema, updateDealSchema, getDealsQuerySchema } from '../schemas/deal.schema';

const router = Router();
const { dealController } = container;

router.get('/', validate(getDealsQuerySchema), dealController.getAll);
router.get('/:id', dealController.getById);

// Admin Routes (should be protected by admin middleware later)
router.post('/', validate(createDealSchema), dealController.create);
router.patch('/:id', validate(updateDealSchema), dealController.update);
router.delete('/:id', dealController.delete);

export default router;
