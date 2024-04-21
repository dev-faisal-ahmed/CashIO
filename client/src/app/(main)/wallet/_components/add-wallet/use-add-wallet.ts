import { useInput } from '@/hooks/use-input';
import { useState } from 'react';

export const useAddWallet = () => {
  const [name, onNameChange, setNameError] = useInput();
  const [balance, onBalanceChange, setBalanceError] = useInput();
  const [isSavingWallet, setIsSavingWallet] = useState(false);

  const handleSavingWalletToggle = () => {
    setIsSavingWallet((prev) => !prev);
  };

  return {
    states: { name, balance, isSavingWallet },
    handles: { onNameChange, onBalanceChange, handleSavingWalletToggle },
  };
};
