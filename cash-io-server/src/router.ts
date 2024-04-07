import { Router } from 'express';
import { userRouter } from './modules/user/user.router';
import { sourceRouter } from './modules/source/source.router';
import { walletRouter } from './modules/wallet/wallet.router';
import { transactionRouter } from './modules/transactions/transaction.router';
import { contactRouter } from './modules/contact/contact.router';

export const appRouter = Router();

appRouter.use('/auth', userRouter);
appRouter.use('/source', sourceRouter);
appRouter.use('/wallet', walletRouter);
appRouter.use('/transaction', transactionRouter);
appRouter.use('/contact', contactRouter);
