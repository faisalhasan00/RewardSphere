import { Router } from 'express';
import { container } from '../../../core/container';
import { validate } from '../../../middlewares/validation/validate';
import { authLimiter, otpLimiter } from '../../../middlewares/rateLimiter';
import { signupSchema, loginSchema, verifyOtpSchema, requestOtpSchema } from '../schemas/auth.schema';

const router = Router();
const { authController } = container;

router.post('/signup', authLimiter, validate(signupSchema), authController.signup);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/verify-otp', otpLimiter, validate(verifyOtpSchema), authController.verifyOTP);
router.post('/request-otp', otpLimiter, validate(requestOtpSchema), authController.requestOTP);

export default router;
