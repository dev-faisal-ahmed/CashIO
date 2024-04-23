import { TIcon } from '@/components/shared/icon/icon-helper';
import { useInput } from '@/hooks/use-input';
import { TSourceType } from '@/utils/types/data.types';
import { useState } from 'react';

type TUseAddSource = {
  onCloseModal: () => void;
};

export const useAddSource = ({ onCloseModal }: TUseAddSource) => {
  const [name, onNameChange, setNameError] = useInput();
  const [budget, onBudgetChange, setBudgetError] = useInput();
  const [icon, setIcon] = useState<TIcon>();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<TSourceType>('EXPENSE');

  const updateIcon = (payload: TIcon) => {
    setIcon(payload);
  };

  const onAddSource = () => {
    console.log('added');
  };

  return {
    states: { name, icon, budget, loading, type },
    handlers: {
      onNameChange,
      updateIcon,
      onBudgetChange,
      onAddSource,
      setType,
    },
  };

  // const handleSavingWalletToggle = () => {
  //   setIsSavingWallet((prev) => !prev);
  // };

  // const onAddWallet = async () => {
  //   setNameError('');
  //   setBalanceError('');
  //   // validation
  //   if (!name.value) return setNameError('Name is required');
  //   const numberRegex = /^-?\d*\.?\d+$/;
  //   if (!numberRegex.test(balance.value))
  //     return setBalanceError('Invalid Initial Balance');

  //   try {
  //     setIsLoading(true);

  //     const response = await fetchHelper<any, TAddWalletPayload>({
  //       url: 'wallet',
  //       method: 'POST',
  //       body: {
  //         name: name.value,
  //         initialBalance: Number(balance.value),
  //         icon: icon!,
  //         saving: isSavingWallet,
  //       },
  //     });

  //     if (!response.ok) throw new Error(response.message);
  //     toast.success(response.message);
  //     refetch();
  //     onCloseModal();
  //   } catch (err: any) {
  //     console.log(err);
  //     toast.error('Error Occurred!', err.message || 'Something went wrong');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
};
