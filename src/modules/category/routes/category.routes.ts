import { Router } from 'express';
import { container } from '../../../core/container';
import { validate } from '../../../middlewares/validation/validate';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';

const router = Router();
const { categoryController } = container;

router.get('/', categoryController.getAll);
router.get('/hierarchy', categoryController.getHierarchy);
router.post('/', validate(createCategorySchema), categoryController.create);
router.patch('/:id', validate(updateCategorySchema), categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;
