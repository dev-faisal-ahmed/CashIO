import { Schema } from 'mongoose';

export type WalletType = {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  name: string;
  income: number;
  expense: number;
  saving: boolean;
  icon: string;
};
