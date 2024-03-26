import { Schema, model } from 'mongoose';
import { UserType } from './User.Interface';

const UserSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model('user', UserSchema);
