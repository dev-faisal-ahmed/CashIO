import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TSource } from '@/utils/types/data.types';
import { create } from 'zustand';

type TSourceServices = {
  sources: TSource[];
  loading: boolean;
  fetch: () => void;
  refetch: () => void;
  firstFetch: boolean;
  shouldRefetch: boolean;
};

export const useSourceServices = create<TSourceServices>((set, get) => ({
  sources: [],
  loading: false,
  firstFetch: true,
  shouldRefetch: false,
  fetch: async () => {
    const { firstFetch, shouldRefetch } = get();
    if (!firstFetch && !shouldRefetch) return;

    set({ loading: true });
    set({ firstFetch: false });

    try {
      const response = await fetchHelper({ url: 'source' });
      if (response.ok) set({ sources: response.data as TSource[] });
      else set({ sources: [] });
    } catch (err) {
      console.log(err);
      // so that it can be fetched later
      set({ firstFetch: true });
    } finally {
      set({ loading: false });
    }
  },
  refetch: () => {
    set({ shouldRefetch: true });
    const { fetch } = get();
    fetch();
    set({ shouldRefetch: false });
  },
}));
