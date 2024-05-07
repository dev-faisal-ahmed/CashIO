import { TIcon } from '@/components/shared/icon/icon-helper';
import { useInput } from '@/hooks/use-input';
import { useWalletDetailsServices } from '@/store/use-wallet-details-services';
import { useWalletsServices } from '@/store/use-wallets-services';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { toast } from '@/utils/helpers/toast.helper';
import { TEditWalletPayload } from '@/utils/types/server.types';
import { useState } from 'react';

type UseEditWallet = {
  onCloseModal: () => void;
  icon: TIcon;
  previousName: string;
  saving: boolean;
  walletId: string;
};

export const useEditWallet = ({
  icon,
  onCloseModal,
  previousName,
  saving,
  walletId,
}: UseEditWallet) => {
  const [selectedIcon, setSelectedIcon] = useState(icon);
  const [name, onNameChange, setNameError] = useInput(previousName);
  const [isSavingWallet, setIsSavingWallet] = useState(saving);
  const [isLoading, setLoading] = useState(false);
  const { refetch: walletDetailsRefetch } = useWalletDetailsServices();
  const { refetch: walletRefetch } = useWalletsServices();

  const updateIcon = (payload: TIcon) => setSelectedIcon(payload);
  const handleSavingWalletToggle = () =>
    setIsSavingWallet((prevState) => !prevState);

  const onEditWallet = async () => {
    setNameError('');
    if (!name.value) return setNameError('Wallet Name is required');
    if (!selectedIcon) return toast.error('Select Any Icon');

    try {
      setLoading(true);
      const response = await fetchHelper<any, TEditWalletPayload>({
        url: `wallet/${walletId}`,
        method: 'PATCH',
        body: {
          name: name.value,
          icon: selectedIcon!,
          saving: isSavingWallet,
        },
      });

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      walletDetailsRefetch(walletId);
      walletRefetch();
      onCloseModal();
    } catch (err: any) {
      console.log(err);
      toast.error('Error Occurred!', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    states: { selectedIcon, isSavingWallet, isLoading },
    handlers: { updateIcon, handleSavingWalletToggle, onEditWallet },
    form: { fields: { name }, handlers: { onNameChange } },
  };
};
