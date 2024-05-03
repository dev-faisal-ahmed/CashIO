import { DatePickerContext } from '@/components/shared/date-picker/date-picker';
import { TAddTransactionPayload } from '@/utils/types/server.types';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useSourceServices } from '@/store/use-source-services';
import { useWalletServices } from '@/store/use-wallet-services';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TSource, TTransactionType, TWallet } from '@/utils/types/data.types';
import { toast } from '@/utils/helpers/toast.helper';
import { AddTradeContext } from '../add-trade-context';

export const useAddTransaction = () => {
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

  const {
    states: { amount, selectedTradeType },
    handlers: { setAmountError, onAmountChange },
  } = useContext(AddTradeContext)!;

  const sources = useMemo(() => {
    return data.filter(
      (source) => source.type === selectedTradeType || source.type === 'BOTH'
    );
  }, [selectedTradeType, data]);

  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
  const [showSources, setShowSources] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const { date } = useContext(DatePickerContext)!;

  const onSourceUpdate = (source: TSource) => setSelectedSource(source);
  const onWalletUpdate = (wallet: TWallet) => setSelectedWallet(wallet);

  const onAddTransaction = async () => {
    setAmountError('');
    if (!amount.value) return setAmountError('Amount is required');

    try {
      setApiLoading(true);
      const response = await fetchHelper<any, TAddTransactionPayload>({
        url: '/transaction',
        method: 'POST',
        body: {
          amount: Number(amount.value),
          sourceId: selectedSource._id,
          walletId: selectedWallet._id,
          type: selectedTradeType as TTransactionType,
          date: date.getTime(),
        },
      });

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      onAmountChange('');
    } catch (err: any) {
      console.log(err);
      toast.error('Error Occurred!', err.message || 'Something went wrong');
    } finally {
      setApiLoading(false);
    }
  };

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
      sourceLoading,
      walletLoading,
      selectedSource,
      selectedWallet,
      showSources,
      showWallets,
      apiLoading,
    },

    handlers: {
      onSourceUpdate,
      setShowSources,
      setShowWallets,
      onWalletUpdate,
      onAddTransaction,
    },
  };
};
