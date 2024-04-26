import { useInput } from '@/hooks/use-input';
import { useState } from 'react';

export const useAddTrade = () => {
  const [amount, onAmountChange, setAmountError] = useInput();
  const [selectedTradeType, setSelectedTradeType] = useState('EXPENSE');

  const onSelectedTradeTypeChange = (val: string) => {
    setSelectedTradeType(val);
  };

  return {
    states: { amount, selectedTradeType },
    handlers: {
      onAmountChange,
      onSelectedTradeTypeChange,
    },
  };
};
