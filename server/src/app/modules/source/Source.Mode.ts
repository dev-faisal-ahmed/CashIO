import { Schema, model } from 'mongoose';
import { SourceType } from './Source.Interface';
import { IncomeExpensesConstant } from '../../global/Global.Constants';

const SourceSchema = new Schema<SourceType>({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  amount: { type: Number, required: true, default: 0 },
  budget: { type: Number, required: true, default: 0 },
  type: { type: String, enum: IncomeExpensesConstant, required: true },
  icon: { type: String, required: true },
});

export const SourceModel = model('source', SourceSchema);
