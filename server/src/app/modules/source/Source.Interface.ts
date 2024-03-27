import { Schema } from 'mongoose';

export type TypesOfSourcesType = 'expense' | 'income';
export type SourceType = {
  _id: Schema.Types.ObjectId;
  name: string;
  user: Schema.Types.ObjectId;
  amount: number;
  budget: number;
  type: TypesOfSourcesType;
  icon: string;
};
