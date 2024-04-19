import { Schema, model } from 'mongoose';
import { TSource } from './source.interface';
import { sourceTypes } from './source.constants';

const SourceSchema = new Schema<TSource>({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  budget: { type: Number, default: 0 },
  icon: { type: String, required: true },
  type: { type: String, enum: sourceTypes, required: true },
});

export const Source = model('source', SourceSchema);
