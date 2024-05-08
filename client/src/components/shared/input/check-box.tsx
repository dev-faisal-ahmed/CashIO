import { Text, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Feather } from '@expo/vector-icons';

type CheckBoxProps = {
  customClass?: string;
  placeholder: string;
  isSelected: boolean;
  onToggle: () => void;
};

export function CheckBox({
  customClass,
  placeholder,
  isSelected,
  onToggle,
}: CheckBoxProps) {
  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        onPress={onToggle}
        className={twMerge(
          'w-8 h-8 rounded-lg border border-primary-500 p-1',
          customClass,
          isSelected ? 'bg-card-bg-dark border-card-bg-dark' : ''
        )}
      >
        {isSelected && <Feather name="check" size={24} color="white" />}
      </TouchableOpacity>
      <Text className="text-white ml-4">{placeholder}</Text>
    </View>
  );
}
