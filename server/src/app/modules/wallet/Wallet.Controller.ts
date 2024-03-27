import { SendSuccessResponse } from '../../utils/ResponseHelper';
import { TryCatch } from '../../utils/TryCatch';
import { WalletServices } from './Wallet.Services';

const CreateWallet = TryCatch(async (req, res) => {
  const newWallet = await WalletServices.CreateWallet(req.user, req.body);

  SendSuccessResponse(res, {
    data: newWallet,
    message: 'Wallet Created Successfully',
    status: 200,
  });
});

export const WalletController = { CreateWallet };
