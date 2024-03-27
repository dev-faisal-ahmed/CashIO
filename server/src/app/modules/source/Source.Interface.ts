import { Schema } from 'mongoose';
import { IncomeExpenseType } from '../../global/Global.Interface';

export type SourceType = {
  _id: Schema.Types.ObjectId;
  name: string;
  user: Schema.Types.ObjectId;
  amount: number;
  budget: number;
  type: IncomeExpenseType;
  icon: string;
};
