import { Router } from 'express';
import { container } from '../../../core/container';
import { validate } from '../../../middlewares/validation/validate';
import { createStoreSchema, updateStoreSchema } from '../schemas/store.schema';

const router = Router();
const { storeController } = container;

router.get('/', storeController.getAll);
router.get('/featured', storeController.getFeatured);
router.get('/slug/:slug', storeController.getBySlug);
router.get('/:id', storeController.getBySlug); // Keeping this for compatibility or changing to getBySlug if preferred
router.post('/', validate(createStoreSchema), storeController.create);
router.patch('/:id', validate(updateStoreSchema), storeController.update);
router.delete('/:id', storeController.delete);

export default router;
