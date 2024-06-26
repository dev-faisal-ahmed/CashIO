import { TIcon } from '@/components/shared/icon/icon-helper';
import { useInput } from '@/hooks/use-input';
import { useWalletsServices } from '@/store/use-wallets-services';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { toast } from '@/utils/helpers/toast.helper';
import { TAddWalletPayload } from '@/utils/types/server.types';
import { useState } from 'react';

type TUseAddWallet = {
  onCloseModal: () => void;
};

export const useAddWallet = ({ onCloseModal }: TUseAddWallet) => {
  const [name, onNameChange, setNameError] = useInput();
  const [balance, onBalanceChange, setBalanceError] = useInput();
  const [icon, setIcon] = useState<TIcon>();
  const [isSavingWallet, setIsSavingWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useWalletsServices((state) => state);

  const updateIcon = (payload: TIcon) => {
    setIcon(payload);
  };

  const handleSavingWalletToggle = () => {
    setIsSavingWallet((prev) => !prev);
  };

  const onAddWallet = async () => {
    setNameError('');
    setBalanceError('');
    // validation
    if (!name.value) return setNameError('Name is required');
    const numberRegex = /^-?\d*\.?\d+$/;
    if (!numberRegex.test(balance.value))
      return setBalanceError('Invalid Initial Balance');

    try {
      setIsLoading(true);

      const response = await fetchHelper<any, TAddWalletPayload>({
        url: 'wallet',
        method: 'POST',
        body: {
          name: name.value,
          initialBalance: Number(balance.value),
          icon: icon!,
          saving: isSavingWallet,
        },
      });

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      refetch();
      onCloseModal();
    } catch (err: any) {
      console.log(err);
      toast.error('Error Occurred!', err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    states: { name, balance, isSavingWallet, icon, isLoading },
    handles: {
      onNameChange,
      onBalanceChange,
      handleSavingWalletToggle,
      updateIcon,
      onAddWallet,
    },
  };
};
