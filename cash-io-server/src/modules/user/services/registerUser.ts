import { TRegistrationPayload } from '../user.validation';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../../utils/app.error';
import { User } from '../user.model';

export const registerUser = async (payload: TRegistrationPayload) => {
  // checking if this user exist or not
  const isUserExist = await User.findOne({ email: payload.email });

  if (isUserExist)
    throw new AppError('User Already Exist', StatusCodes.BAD_REQUEST);

  const newUser = await User.create(payload);

  return newUser;
};
