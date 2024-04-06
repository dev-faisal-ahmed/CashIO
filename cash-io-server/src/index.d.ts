import { JwtPayload } from 'jsonwebtoken';
import { UserType } from './modules/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & UserType;
    }
  }
}
