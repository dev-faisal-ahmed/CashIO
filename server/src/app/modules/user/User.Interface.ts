import { Schema } from 'mongoose';

export type UserType = {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  balance: number;
  expense: number;
  income: number;
  borrow: number;
  lend: number;
};
