import { JwtPayload } from 'jsonwebtoken';
import { UserType } from './app/modules/user/User.Interface';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & UserType;
    }
  }
}
