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
export type TTradeTypes = 'EXPENSE' | 'INCOME' | 'LEND' | 'BORROW' | 'TRANSFER';

export type TWalletDetailsTransaction = {
  _id: string;
  sourceId: {
    name: string;
    icon: TIcon;
  };
  amount: number;
  date: string;
  type: TTransactionType;
};

export type TWalletDetails = {
  wallet: {
    _id: string;
    name: string;
    income: number;
    expense: number;
    saving: boolean;
    icon: TIcon;
  };
  transactions: TWalletDetailsTransaction[];
};

export type TSourceDetailsTransaction = {
  _id: string;
  wallet: {
    name: string;
    icon: TIcon;
  }[];
  amount: number;
  date: string;
  type: TTradeTypes;
};

export type TSourceDetails = {
  source: {
    _id: string;
    name: string;
    budget: number;
    icons: TIcon;
    type: TSourceType;
  };
  transactionDetails: {
    transactions: TSourceDetailsTransaction[];
    income: number;
    expense: number;
  };
};
