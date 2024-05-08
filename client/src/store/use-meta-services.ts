import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TMetaData } from '@/utils/types/data.types';
import { create } from 'zustand';

type TSourceDetailsService = {
  metaData: TMetaData | undefined;
  loading: boolean;
  shouldRefetch: boolean;
  fetch: () => void;
  enableRefetch: () => void;
};

export const useMetaServices = create<TSourceDetailsService>((set, get) => ({
  metaData: undefined,
  loading: false,
  shouldRefetch: true,

  fetch: async () => {
    // preventing unnecessary api calls
    const { shouldRefetch } = get();
    if (!shouldRefetch) return;
    set({ loading: true });

    try {
      const response = await fetchHelper({ url: `meta` });
      if (response.ok) set({ metaData: response.data as TMetaData });
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
