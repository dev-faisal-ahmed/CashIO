import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../utils/AppError';
import { UserType } from '../user/User.Interface';
import { WalletModel } from './Wallet.Model';
import { CreateWalletValidationSchemaType } from './Wallet.Validation';

const CreateWallet = async (
  user: UserType,
  payload: CreateWalletValidationSchemaType
) => {
  // checking if the wallet exist or not
  const wallet = await WalletModel.findOne({
    name: payload.name,
    user: user._id,
  });

  if (wallet)
    throw new AppError('Wallet Already Exist', StatusCodes.BAD_REQUEST);

  const newWallet = await WalletModel.create({ ...payload, user: user._id });

  return newWallet;
};

export const WalletServices = { CreateWallet };
