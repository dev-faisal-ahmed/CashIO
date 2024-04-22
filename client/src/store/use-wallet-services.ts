import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TWallet } from '@/utils/types/data.types';
import { create } from 'zustand';

type TWalletServices = {
  wallets: TWallet[];
  loading: boolean;
  fetch: () => void;
  refetch: () => void;
  firstFetch: boolean;
  shouldRefetch: boolean;
};

export const useWalletServices = create<TWalletServices>((set, get) => ({
  wallets: [],
  loading: false,
  firstFetch: true,
  shouldRefetch: false,

  fetch: async () => {
    // preventing unnecessary api calls
    if (!get().firstFetch && !get().shouldRefetch) return;
    set({ loading: true });
    set({ firstFetch: false });

    // testing purpose
    console.log('data fetching');

    try {
      const response = await fetchHelper({ url: 'wallet' });
      if (response.ok) set({ wallets: response.data as TWallet[] });
      else set({ wallets: [] });
    } catch (err) {
      console.log(err);
      // so that it can be fetched later
      set({ firstFetch: true });
    } finally {
      set({ loading: false });
    }
  },

  refetch: async () => {
    set({ shouldRefetch: true });
    const { fetch } = useWalletServices.getState();
    fetch();
    set({ shouldRefetch: false });
  },
}));
