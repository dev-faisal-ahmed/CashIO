import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { tryCatch } from '../../utils/try-catch';
import { walletServices } from './services/wallet.services';

const createWallet = tryCatch(async (req, res) => {
  const newWallet = await walletServices.createWallet(req.user, req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Wallet Created Successfully',
    data: newWallet,
  });
});

const getWallets = tryCatch(async (req, res) => {
  const wallets = await walletServices.getWallets(req.user);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Wallet Retrieved Successfully',
    data: wallets,
  });
});

export const walletController = { createWallet, getWallets };
