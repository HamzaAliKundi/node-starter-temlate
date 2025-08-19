import { Router } from 'express';
import { getMe, login, register, resetPassword, sendForgotPasswordEmail, verifyEmail } from '../controllers/auth';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', sendForgotPasswordEmail);
router.post('/reset-password', resetPassword);
router.get('/me', authMiddleware, getMe);

export default router; 