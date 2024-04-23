import { TSourceType } from '@/utils/types/data.types';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type SourceTypeButtonProps = {
  type: TSourceType;
  onTypeChange: (payload: TSourceType) => void;
  activeType: TSourceType;
  index: number;
};

export function SourceTypeButton({
  type,
  onTypeChange,
  activeType,
  index,
}: SourceTypeButtonProps) {
  return (
    <TouchableWithoutFeedback onPress={() => onTypeChange(type)}>
      <View
        className={twMerge(
          'flex-1 items-center py-4',
          index === 0 ? '' : 'border-l border-primary-500',
          activeType === type ? 'bg-primary-500' : ''
        )}
      >
        <Text className="text-white">{type}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
