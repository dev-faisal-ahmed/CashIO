import { DatePickerContext } from '@/components/shared/date-picker/date-picker';
import { TAddTransactionPayload } from '@/utils/types/server.types';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useSourceServices } from '@/store/use-source-services';
import { useWalletServices } from '@/store/use-wallet-services';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TSource, TTransactionType, TWallet } from '@/utils/types/data.types';
import { toast } from '@/utils/helpers/toast.helper';

type TUseAddTransaction = {
  tardeType: TTransactionType;
  amount: string;
  setAmountError: (msg: string) => void;
  resetAmount: () => void;
};

export const useAddTransaction = ({
  tardeType,
  amount,
  setAmountError,
  resetAmount,
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
  const [apiLoading, setApiLoading] = useState(false);
  const { date } = useContext(DatePickerContext)!;

  const onSourceUpdate = (source: TSource) => setSelectedSource(source);
  const onWalletUpdate = (wallet: TWallet) => setSelectedWallet(wallet);

  const onAddTransaction = async () => {
    setAmountError('');
    if (!amount) return setAmountError('Amount is required');

    try {
      setApiLoading(true);
      const response = await fetchHelper<any, TAddTransactionPayload>({
        url: '/transaction',
        method: 'POST',
        body: {
          amount: Number(amount),
          sourceId: selectedSource._id,
          walletId: selectedWallet._id,
          type: tardeType,
          date: date.getTime(),
        },
      });

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      resetAmount();
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
