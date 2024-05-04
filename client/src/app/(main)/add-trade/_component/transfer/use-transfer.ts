import { useInput } from '@/hooks/use-input';
import { useWalletServices } from '@/store/use-wallet-services';
import { TWallet } from '@/utils/types/data.types';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AddTradeContext } from '../add-trade-context';
import { toast } from '@/utils/helpers/toast.helper';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TTransferPayload } from '@/utils/types/server.types';
import { DatePickerContext } from '@/components/shared/date-picker/date-picker';

export const useTransfer = () => {
  const [selectedFromWallet, setSelectedFromWallet] = useState<TWallet>();
  const [selectedToWallet, setSelectedToWallet] = useState<TWallet>();
  const [fee, onFeeChange, setFeeError] = useInput();
  const [apiLoading, setApiLoading] = useState(false);
  const { fetch, loading, wallets } = useWalletServices();
  const { date } = useContext(DatePickerContext)!;

  const {
    states: { amount },
    handlers: { setAmountError, onAmountChange },
  } = useContext(AddTradeContext)!;

  useEffect(() => {
    fetch();
  }, []);

  const toWalletList = useMemo(() => {
    return wallets.filter((wallet) => wallet._id !== selectedFromWallet?._id);
  }, [wallets, selectedFromWallet]);

  const onFromWalletChange = (wallet: TWallet) => setSelectedFromWallet(wallet);
  const onToWalletChange = (wallet: TWallet) => setSelectedToWallet(wallet);

  const onTransfer = async () => {
    setAmountError('');
    // validation
    if (!amount.value) return setAmountError('Amount is required');
    if (amount.value && Number(amount.value) < 0)
      return setAmountError('Amount has to more than 0');
    if (fee.value && Number(fee.value) < 0)
      return setFeeError('Fee has to be more than 0');
    if (!selectedFromWallet) return toast.error('Please Select From Wallet');

    if (!selectedToWallet) return toast.error('Please Select To Wallet');

    try {
      setApiLoading(true);
      const response = await fetchHelper<unknown, TTransferPayload>({
        url: 'transfer',
        method: 'POST',
        body: {
          amount: Number(amount.value),
          date: date.getTime(),
          receiverWalletId: selectedToWallet._id,
          senderWalletId: selectedFromWallet._id,
          fee: Number(fee.value) || 0,
        },
      });
      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      // resetting everything
      onAmountChange('');
      setSelectedFromWallet(undefined);
      setSelectedToWallet(undefined);
      onFeeChange('');
    } catch (err: any) {
      console.log(err);
      toast.error('Error Occurred!', err.message || 'Something went wrong');
    } finally {
      setApiLoading(false);
    }
  };

  return {
    states: {
      selectedFromWallet,
      selectedToWallet,
      wallets,
      loading,
      toWalletList,
      fee,
      apiLoading,
    },
    handlers: { onFromWalletChange, onToWalletChange, onFeeChange, onTransfer },
  };
};
