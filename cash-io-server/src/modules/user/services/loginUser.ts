import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../../utils/app.error';
import { User } from '../user.model';
import { LoginPayloadType } from '../user.validation';
import jwt, { Secret } from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config';

export const loginUser = async (payload: LoginPayloadType) => {
  const user = await User.findOne({ email: payload.email });

  // no user found
  if (!user) throw new AppError('User Not Found', StatusCodes.NOT_FOUND);

  // generating a token
  const token = jwt.sign(
    { email: user.email, _id: user._id, name: user.name },
    JWT_SECRET as Secret,
    { expiresIn: '30d' }
  );

  return { token };
};
