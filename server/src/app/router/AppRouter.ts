import { Router } from 'express';
import { UserRouter } from '../modules/user/User.Router';
import { SourceRouter } from '../modules/source/Source.Router';
import { WalletRouter } from '../modules/wallet/Wallet.Router';

export const AppRouter = Router();

AppRouter.use('/auth', UserRouter);
AppRouter.use('/source', SourceRouter);
AppRouter.use('/wallet', WalletRouter);
