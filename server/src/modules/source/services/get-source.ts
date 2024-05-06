import { Transaction } from '../../transactions/transaction.model';
import { Source } from '../source.model';

export const getSource = async (sourceId: string) => {
  const source = await Source.findOne({ _id: sourceId });
  const transactions = await Transaction.find({ sourceId }).populate(
    'walletId'
  );

  return { source, transactions };
};
