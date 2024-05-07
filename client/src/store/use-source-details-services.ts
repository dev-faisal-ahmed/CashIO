import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TSourceDetails } from '@/utils/types/data.types';
import { create } from 'zustand';

type TSourceDetailsService = {
  sourceDetails: TSourceDetails | undefined;
  sourceId: string;
  loading: boolean;
  fetch: (sourceId: string) => void;
  refetch: (sourceId: string) => void;
  shouldRefetch: boolean;
  enableRefetch: () => void;
};

export const useSourceDetailsServices = create<TSourceDetailsService>(
  (set, get) => ({
    sourceDetails: undefined,
    sourceId: '',
    loading: false,
    shouldRefetch: true,

    fetch: async (id: string) => {
      // preventing unnecessary api calls
      const { shouldRefetch, sourceId } = get();
      if (id === sourceId && !shouldRefetch) return;
      set({ loading: true });
      set({ sourceId: id });

      try {
        const response = await fetchHelper({ url: `source/${id}` });
        if (response.ok)
          set({ sourceDetails: response.data as TSourceDetails });
        else set({ sourceId: undefined });
        set({ shouldRefetch: false });
      } catch (err) {
        console.log(err);
        set({ shouldRefetch: true });
      } finally {
        set({ loading: false });
      }
    },

    refetch: (sourceId: string) => {
      const { fetch } = get();
      set({ shouldRefetch: true });
      fetch(sourceId);
    },
    enableRefetch: () => {
      set({ shouldRefetch: true });
    },
  })
);
