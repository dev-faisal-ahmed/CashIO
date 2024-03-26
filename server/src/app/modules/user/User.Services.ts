import { UserModel } from './User.Model';
import { CreateUserValidationSchemaType } from './User.Validation';

const CreateUser = async (payload: CreateUserValidationSchemaType) => {
  const newUser = await UserModel.create(payload);
  return newUser;
};

export const UserServices = { CreateUser };
