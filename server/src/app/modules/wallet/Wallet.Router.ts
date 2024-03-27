import { Router } from 'express';
import { AuthGuard } from '../../middlewares/AuthGuard';
import { ValidationHandler } from '../../middlewares/ValidationHandler';
import { WalletValidation } from './Wallet.Validation';
import { WalletController } from './Wallet.Controller';

export const WalletRouter = Router();

WalletRouter.post(
  '/',
  AuthGuard(),
  ValidationHandler(WalletValidation.CreateWalletValidationSchema),
  WalletController.CreateWallet
);
