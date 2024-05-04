import { Text, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type ActiveButtonProps = {
  value: string;
  _id: string;
  active_Id: string;
  onPress: () => void;
  width?: number;
};

export function ActiveButton({
  value,
  _id,
  active_Id,
  onPress,
  width,
}: ActiveButtonProps) {
  return (
    <>
      <View className="flex-1" style={{ width }}>
        <TouchableOpacity
          onPress={onPress}
          className={twMerge(
            'py-2 rounded-lg',
            _id === active_Id ? 'bg-primary-500' : ''
          )}
        >
          <Text className="text-white text-center  uppercase">{value}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
