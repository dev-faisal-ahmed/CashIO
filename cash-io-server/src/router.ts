import { Router } from 'express';
import { userRouter } from './modules/user/user.router';
import { sourceRouter } from './modules/source/source.router';
import { walletRouter } from './modules/wallet/wallet.router';

export const appRouter = Router();

appRouter.use('/auth', userRouter);
appRouter.use('/source', sourceRouter);
appRouter.use('/wallet', walletRouter);