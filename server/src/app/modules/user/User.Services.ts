import {
  CreateUserValidationSchemaType,
  LoginValidationSchemaType,
} from './User.Validation';
import { AppError } from '../../utils/AppError';
import { UserModel } from './User.Model';
import { StatusCodes } from 'http-status-codes';
import { JWT_SECRET } from '../../../config/config';
import JWT, { Secret } from 'jsonwebtoken';

const CreateUser = async (payload: CreateUserValidationSchemaType) => {
  const newUser = await UserModel.create(payload);
  return newUser;
};

const Login = async (payload: LoginValidationSchemaType) => {
  const user = await UserModel.findOne({ email: payload.email });
  if (!user) throw new AppError('User not found', StatusCodes.NOT_FOUND);

  const token = JWT.sign(
    { email: user.email, _id: user._id },
    JWT_SECRET as Secret
  );
  return { token };
};

export const UserServices = { CreateUser, Login };
