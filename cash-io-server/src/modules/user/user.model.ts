import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  income: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  borrow: { type: Number, default: 0 },
  lend: { type: Number, default: 0 },
});

export const User = model('user', UserSchema);
