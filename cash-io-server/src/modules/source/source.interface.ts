import { Schema } from 'mongoose';

export type TSourceType = 'INCOME' | 'EXPENSE';

export type TSource = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  name: string;
  amount: number;
  budget: number;
  sourceType: TSourceType;
  icon: string;
};
