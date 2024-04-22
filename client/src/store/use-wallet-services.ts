import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TWallet } from '@/utils/types/data.types';
import { create } from 'zustand';

type TWalletServices = {
  wallets: TWallet[];
  loading: boolean;
  fetch: () => void;
  refetch: () => void;
};

export const useWalletServices = create<TWalletServices>((set) => ({
  wallets: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {
      const response = await fetchHelper({ url: 'wallet' });
      if (response.ok) set({ wallets: response.data as TWallet[] });
      else set({ wallets: [] });
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  refetch: async () => {
    const { fetch } = useWalletServices.getState();
    fetch();
  },
}));
