import { JWT_SECRET } from '../../config/config';
import { UserModel } from '../modules/user/User.Model';
import { AppError } from '../utils/AppError';
import { TryCatch } from '../utils/TryCatch';
import { StatusCodes } from 'http-status-codes';
import JWT, { JwtPayload, Secret } from 'jsonwebtoken';

export const AuthGuard = () => {
  return TryCatch(async (req, _, next) => {
    const token = req.headers.authorization;
    if (!token)
      throw new AppError('You are unauthorized', StatusCodes.UNAUTHORIZED);

    const decodedUser = JWT.verify(token, JWT_SECRET as Secret) as JwtPayload;
    const { _id } = decodedUser;

    // getting user info
    const user = await UserModel.findById(_id);
    if (!user) throw new AppError('User not found', StatusCodes.NOT_FOUND);

    req.user = user;
    next();
  });
};
