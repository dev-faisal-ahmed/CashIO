import { useInput } from '@/hooks/use-input';
import { TTradeTypes } from '@/utils/types/data.types';
import { PropsWithChildren, createContext, useState } from 'react';

type TAddTradeContext = {
  states: {
    amount: {
      value: string;
      error: string;
    };
    selectedTradeType: TTradeTypes;
  };

  handlers: {
    onSelectedTradeTypeChange: (val: TTradeTypes) => void;
    onAmountChange: (val: string) => void;
    setAmountError: (error: string) => void;
  };
};

export const AddTradeContext = createContext<TAddTradeContext | null>(null);

export function AddTradeProvider({ children }: PropsWithChildren) {
  const [amount, onAmountChange, setAmountError] = useInput();
  const [selectedTradeType, setSelectedTradeType] =
    useState<TTradeTypes>('EXPENSE');

  const onSelectedTradeTypeChange = (val: TTradeTypes) => {
    setSelectedTradeType(val);
  };
  return (
    <AddTradeContext.Provider
      value={{
        states: { amount, selectedTradeType },
        handlers: { onSelectedTradeTypeChange, onAmountChange, setAmountError },
      }}
    >
      {children}
    </AddTradeContext.Provider>
  );
}
