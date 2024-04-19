import { Schema, model } from 'mongoose';
import { TWallet } from './wallet.interface';

const WalletSchema = new Schema<TWallet>({
  name: { type: String, trim: true, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  income: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  icon: { type: String, trim: true, required: true },
  saving: { type: Boolean, default: false },
});

export const Wallet = model('wallet', WalletSchema);
