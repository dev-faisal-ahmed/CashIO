import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { tryCatch } from '../../utils/try-catch';
import { userServices } from './services/user.services';

const registerUser = tryCatch(async (req, res) => {
  const newUser = await userServices.registerUser(req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'User Created Successfully',
    data: newUser,
  });
});

export const userController = { registerUser };
