import { StatusCodes } from 'http-status-codes';
import { UserType } from '../user/User.Interface';
import { SourceModel } from './Source.Mode';
import { CreateSourceSchemaType } from './Source.Validation';
import { AppError } from '../../utils/AppError';

const CreateSource = async (
  user: UserType,
  payload: CreateSourceSchemaType
) => {
  // checking if the source exist or not
  const source = await SourceModel.findOne({
    name: payload.name,
    user: user._id,
  });

  if (source)
    throw new AppError('This source already exist', StatusCodes.CONFLICT);

  const newSource = await SourceModel.create({ ...payload, user: user._id });

  return newSource;
};

export const SourceServices = { CreateSource };
