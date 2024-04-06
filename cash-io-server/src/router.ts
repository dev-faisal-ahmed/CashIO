import { Router } from 'express';
import { userRouter } from './modules/user/user.router';

export const appRouter = Router();

appRouter.use('/auth', userRouter);
