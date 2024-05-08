import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { AddTradeContext } from './add-trade-context';
import { TTradeTypes } from '@/utils/types/data.types';

const tardeTypes: TTradeTypes[] = ['EXPENSE', 'INCOME', 'TRANSFER'];

export function TradeTypeButton() {
  const {
    states: { selectedTradeType },
    handlers: { onSelectedTradeTypeChange },
  } = useContext(AddTradeContext)!;
  return (
    <View className="mt-6">
      <Text className="text-white text-base font-bold mb-4">Type</Text>
      <View className="flex-wrap w-full flex-row">
        {tardeTypes.map((eachType) => (
          <React.Fragment key={eachType}>
            {tradeButton(
              eachType,
              selectedTradeType,
              onSelectedTradeTypeChange
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const tradeButton = (
  value: string,
  active: string,
  onSelectedTypeChanges: (value: TTradeTypes) => void
) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onSelectedTypeChanges(value as TTradeTypes)}
        className={twMerge(
          'py-2 flex-1 rounded-lg',
          value === active ? 'bg-primary-500' : ''
        )}
      >
        <Text className="text-white text-center">{value}</Text>
      </TouchableOpacity>
    </>
  );
};
