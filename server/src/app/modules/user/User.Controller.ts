import { SendSuccessResponse } from '../../utils/ResponseHelper';
import { UserServices } from './User.Services';
import { TryCatch } from '../../utils/TryCatch';

const CreateUser = TryCatch(async (req, res) => {
  const newUser = await UserServices.CreateUser(req.body);

  SendSuccessResponse(res, {
    message: 'User Created',
    data: newUser,
    status: 200,
  });
});

const Login = TryCatch(async (req, res) => {
  const token = await UserServices.Login(req.body);

  SendSuccessResponse(res, {
    message: 'User Created',
    data: token,
    status: 200,
  });
});

export const UserController = { CreateUser, Login };
