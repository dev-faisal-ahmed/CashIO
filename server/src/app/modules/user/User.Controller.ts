import { SendSuccessResponse } from '../../utils/ResponseHelper';
import { TryCatch } from '../../utils/TryCatch';
import { UserServices } from './User.Services';

const CreateUser = TryCatch(async (req, res) => {
  const newUser = UserServices.CreateUser(req.body);

  SendSuccessResponse(res, {
    message: 'User Created',
    data: newUser,
    status: 200,
  });
});

export const UserController = { CreateUser };
