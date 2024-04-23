import { TUser } from '../../user/user.interface';
import { Source } from '../source.model';

export const getSource = async (user: TUser) => {
  const source = await Source.findOne({ userId: user._id });
  return source;
};
