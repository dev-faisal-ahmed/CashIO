import { TIcon } from '@/components/shared/icon/icon-helper';

export type TWallet = {
  _id: string;
  userId: string;
  name: string;
  initialBalance: number;
  saving: boolean;
  icon: TIcon;
};
