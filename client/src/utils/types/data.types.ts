import { TIcon } from '@/components/shared/icon/icon-helper';

export type TWallet = {
  _id: string;
  userId: string;
  name: string;
  initialBalance: number;
  saving: boolean;
  icon: TIcon;
};

export type TSourceType = 'INCOME' | 'EXPENSE' | 'BOTH';
export type TSource = {
  _id: string;
  userId: string;
  name: string;
  amount: number;
  budget: number;
  type: TSourceType;
  icon: TIcon;
};

export type TTransactionType = 'INCOME' | 'EXPENSE';
