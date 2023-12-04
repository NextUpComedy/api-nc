import { Router } from 'express';
import authRouter from './auth';
import userRouter from './users';
import contentRouter from './contents';
import adminRouter from './admin';
import comedianRouter from './comedian';
import accountantRouter from './accountant';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/content', contentRouter);
router.use('/admin', adminRouter);
router.use('/comedian', comedianRouter);
router.use('/accountant', accountantRouter);

export default router;
