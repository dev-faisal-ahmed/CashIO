import { TTradeButton } from '@/utils/types/data.types';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type TradeButtonProps = {
  value: TTradeButton;
  active: TTradeButton;
  onChange: () => void;
  index: number;
};

export function TradeButton({
  value,
  active,
  onChange,
  index,
}: TradeButtonProps) {
  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <View
        className={twMerge(
          'flex-1 items-center py-4',
          index === 0 ? '' : 'border-l border-primary-500',
          active === value ? 'bg-primary-500' : ''
        )}
      >
        <Text className="text-white">{value}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
