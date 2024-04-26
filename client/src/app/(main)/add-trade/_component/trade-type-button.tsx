import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type TradeTypeButtonProps = {
  selectedType: string;
  onSelectedTypeChanges: (value: string) => void;
};

const tardeTypes = ['EXPENSE', 'INCOME', 'LEND', 'BORROW', 'TRANSFER'];

export function TradeTypeButton({
  selectedType,
  onSelectedTypeChanges,
}: TradeTypeButtonProps) {
  return (
    <View className="mt-6">
      <Text className="text-white text-base font-bold mb-4">Type</Text>
      <View className="flex-wrap w-full flex-row">
        {tardeTypes.slice(0, 2).map((eachType) => (
          <React.Fragment key={eachType}>
            {tradeButton(eachType, selectedType, onSelectedTypeChanges)}
          </React.Fragment>
        ))}
      </View>
      <View className="flex-wrap w-full flex-row mt-2">
        {tardeTypes.slice(2, 5).map((eachType) => (
          <React.Fragment key={eachType}>
            {tradeButton(eachType, selectedType, onSelectedTypeChanges)}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const tradeButton = (
  value: string,
  active: string,
  onSelectedTypeChanges: (value: string) => void
) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onSelectedTypeChanges(value)}
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
