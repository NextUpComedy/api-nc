import { Router } from 'express';
import authRouter from './auth';
import userRouter from './users';
import contentRouter from './contents';
import adminRouter from './admin';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/content', contentRouter);
router.use('/admin', adminRouter);

export default router;
