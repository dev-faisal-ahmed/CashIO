import { TIcon } from '@/components/shared/icon/icon-helper';
import { useInput } from '@/hooks/use-input';
import { useState } from 'react';

type TUseAddSource = {
  onCloseModal: () => void;
};

export const useAddSource = ({ onCloseModal }: TUseAddSource) => {
  const [name, onNameChange, setNameError] = useInput();
  const [budget, onBudgetChange, setBudgetError] = useInput();

  const [icon, setIcon] = useState<TIcon>();
  const [isBudgetEnabled, setBudgetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [isSavingWallet, setIsSavingWallet] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const { refetch } = useWalletServices((state) => state);

  const updateIcon = (payload: TIcon) => {
    setIcon(payload);
  };

  const budgetToggle = () => {
    setBudgetEnabled((prev) => !prev);
  };

  const onAddSource = () => {
    console.log('added');
  };

  return {
    states: { name, icon, isBudgetEnabled, budget, loading },
    handlers: {
      onNameChange,
      updateIcon,
      budgetToggle,
      onBudgetChange,
      onAddSource,
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
