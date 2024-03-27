import { Schema, model } from 'mongoose';
import { WalletType } from './Wallet.interface';

const WalletSchema = new Schema<WalletType>({
  name: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'user', required: true },
  income: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  icon: { type: String, required: true },
  saving: { type: Boolean, default: false },
});

export const WalletModel = model('wallet', WalletSchema);
