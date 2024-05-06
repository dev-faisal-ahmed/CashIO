import { DatePickerContext } from '@/components/shared/date-picker/date-picker';
import { TAddTransactionPayload } from '@/utils/types/server.types';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useSourceServices } from '@/store/use-source-services';
import { useWalletsServices } from '@/store/use-wallets-services';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TSource, TTransactionType, TWallet } from '@/utils/types/data.types';
import { toast } from '@/utils/helpers/toast.helper';
import { AddTradeContext } from '../add-trade-context';
import { useWalletDetailsServices } from '@/store/use-wallet-details-services';
import { useSourceDetailsServices } from '@/store/use-source-details-services';

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
  } = useWalletsServices();

  const { enableRefetch: enableWalletRefetch } = useWalletDetailsServices();
  const { enableRefetch: enableSourceRefetch } = useSourceDetailsServices();

  const {
    states: { amount, selectedTradeType },
    handlers: { setAmountError, onAmountChange },
  } = useContext(AddTradeContext)!;

  const sources = useMemo(() => {
    return data.filter(
      (source) => source.type === selectedTradeType || source.type === 'BOTH'
    );
  }, [selectedTradeType, data]);

  const [selectedSource, setSelectedSource] = useState<TSource>();
  const [selectedWallet, setSelectedWallet] = useState<TWallet>();
  const [apiLoading, setApiLoading] = useState(false);
  const { date } = useContext(DatePickerContext)!;

  const onSourceUpdate = (source: TSource) => setSelectedSource(source);
  const onWalletUpdate = (wallet: TWallet) => setSelectedWallet(wallet);

  const onAddTransaction = async () => {
    setAmountError('');
    if (!amount.value) return setAmountError('Amount is required');
    if (Number(amount.value) < 0)
      return setAmountError('Amount can has to be greater than zero');

    try {
      setApiLoading(true);

      if (!selectedSource) return toast.error('No Source Selected');
      if (!selectedWallet) return toast.error('No Wallet Selected');

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
      enableWalletRefetch();
      enableSourceRefetch();
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

  return {
    states: {
      sources,
      wallets,
      sourceLoading,
      walletLoading,
      selectedSource,
      selectedWallet,
      apiLoading,
    },

    handlers: {
      onSourceUpdate,
      onWalletUpdate,
      onAddTransaction,
    },
  };
};
