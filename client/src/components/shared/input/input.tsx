import { colors } from '@/themes/colors';
import { getDimension } from '@/utils/helpers/ui.helper';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

type InputProps = {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
};

const { width } = getDimension();

export function Input({
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onValueChange,
  error,
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
      {error && <Text className="text-error-500 ml-8 mt-2">{error}</Text>}
    </View>
  );
}
