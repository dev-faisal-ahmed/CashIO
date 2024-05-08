import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TTransfer } from '@/utils/types/data.types';
import { create } from 'zustand';

type TTransferService = {
  transfers: TTransfer[] | undefined;
  loading: boolean;
  fetch: () => void;
  shouldRefetch: boolean;
  enableRefetch: () => void;
};

export const useTransferServices = create<TTransferService>((set, get) => ({
  transfers: undefined,
  loading: false,
  shouldRefetch: true,

  fetch: async () => {
    // preventing unnecessary api calls
    const { shouldRefetch } = get();
    if (!shouldRefetch) return;
    set({ loading: true });

    try {
      const response = await fetchHelper({ url: `transfer` });
      if (response.ok) set({ transfers: response.data as TTransfer[] });
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
}));
