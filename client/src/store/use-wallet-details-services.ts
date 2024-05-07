import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TWalletDetails } from '@/utils/types/data.types';
import { create } from 'zustand';

type TWalletDetailsService = {
  walletDetails: TWalletDetails | undefined;
  walletId: string;
  loading: boolean;
  fetch: (walletId: string) => void;
  refetch: (walletId: string) => void;
  shouldRefetch: boolean;
  enableRefetch: () => void;
};

export const useWalletDetailsServices = create<TWalletDetailsService>(
  (set, get) => ({
    walletDetails: undefined,
    walletId: '',
    loading: false,
    shouldRefetch: true,

    fetch: async (id: string) => {
      // preventing unnecessary api calls
      const { shouldRefetch, walletId } = get();
      if (id === walletId && !shouldRefetch) return;
      set({ loading: true });
      set({ walletId: id });

      try {
        const response = await fetchHelper({ url: `wallet/${id}` });
        if (response.ok)
          set({ walletDetails: response.data as TWalletDetails });
        else set({ walletDetails: undefined });
        set({ shouldRefetch: false });
      } catch (err) {
        console.log(err);
        set({ shouldRefetch: true });
        // so that it can be fetched later
      } finally {
        set({ loading: false });
      }
    },

    refetch: (walletId: string) => {
      const { fetch } = get();
      set({ shouldRefetch: true, walletId });
      fetch(walletId);
    },
    enableRefetch: () => {
      set({ shouldRefetch: true });
    },
  })
);
