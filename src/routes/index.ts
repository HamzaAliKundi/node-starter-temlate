import { Router } from 'express';
import authRoutes from './auth';
import noteRoutes from './note';

const router = Router();

router.use('/auth', authRoutes);
router.use('/notes', noteRoutes);

export default router; 