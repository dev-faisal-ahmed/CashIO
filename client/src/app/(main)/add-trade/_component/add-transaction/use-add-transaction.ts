import { useSourceServices } from '@/store/use-source-services';
import { useWalletServices } from '@/store/use-wallet-services';
import { TSource, TWallet } from '@/utils/types/data.types';
import { useEffect, useMemo, useState } from 'react';

type TUseAddTransaction = {
  tardeType: 'EXPENSE' | 'INCOME';
  amount: string;
};

export const useAddTransaction = ({
  tardeType,
  amount,
}: TUseAddTransaction) => {
  const {
    fetch: fetchSources,
    sources: data,
    loading: sourceLoading,
  } = useSourceServices();

  const {
    fetch: fetchWallets,
    wallets,
    loading: walletLoading,
  } = useWalletServices();

  const sources = useMemo(() => {
    return data.filter(
      (source) => source.type === tardeType || source.type === 'BOTH'
    );
  }, [tardeType, data]);

  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
  const [showSources, setShowSources] = useState(false);
  const [showWallets, setShowWallets] = useState(false);

  const remSources = useMemo(() => {
    return sources.filter((source) => source._id !== selectedSource._id);
  }, [selectedSource, sources]);

  const onSourceUpdate = (source: TSource) => setSelectedSource(source);
  const onWalletUpdate = (wallet: TWallet) => setSelectedWallet(wallet);

  useEffect(() => {
    fetchSources();
    fetchWallets();
  }, []);

  useEffect(() => {
    setSelectedSource(sources[0]);
  }, [sources]);

  useEffect(() => {
    setSelectedWallet(wallets[0]);
  }, [wallets]);

  return {
    states: {
      sources,
      wallets,
      remSources,
      sourceLoading,
      walletLoading,
      selectedSource,
      selectedWallet,
      showSources,
      showWallets,
    },

    handlers: {
      onSourceUpdate,
      setShowSources,
      setShowWallets,
      onWalletUpdate,
    },
  };
};
