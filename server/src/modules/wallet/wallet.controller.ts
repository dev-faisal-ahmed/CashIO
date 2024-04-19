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

export const walletController = { createWallet };
