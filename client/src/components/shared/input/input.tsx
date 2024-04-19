import { colors } from '@/themes/colors';
import { getDimension } from '@/utils/helper';
import { KeyboardTypeOptions, TextInput, View } from 'react-native';

type InputProps = {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value: string;
  onValueChange: (value: string) => void;
};

const { width } = getDimension();

export function Input({
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onValueChange,
}: InputProps) {
  return (
    <View>
      <TextInput
        placeholderTextColor={'white'}
        style={{ width: width * 0.85, backgroundColor: colors.card.bg.dark }}
        className="text-lg px-8 py-4 rounded-full text-white"
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onValueChange}
      />
    </View>
  );
}
