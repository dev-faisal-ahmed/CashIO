import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TTransaction } from '@/utils/types/data.types';
import { create } from 'zustand';

type TTransactionsService = {
  transactions: TTransaction[] | undefined;
  loading: boolean;
  fetch: () => void;
  shouldRefetch: boolean;
  enableRefetch: () => void;
};

export const useTransactionServices = create<TTransactionsService>(
  (set, get) => ({
    transactions: undefined,
    loading: false,
    shouldRefetch: true,

    fetch: async () => {
      // preventing unnecessary api calls
      const { shouldRefetch } = get();
      if (!shouldRefetch) return;
      set({ loading: true });

      try {
        const response = await fetchHelper({ url: `transaction` });
        if (response.ok) set({ transactions: response.data as TTransaction[] });
        set({ shouldRefetch: false });
      } catch (err) {
        console.log(err);
        set({ shouldRefetch: true });
      } finally {
        set({ loading: false });
      }
    },

    enableRefetch: () => {
      set({ shouldRefetch: true });
    },
  })
);
