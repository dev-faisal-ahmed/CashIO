import { getDimension } from '@/utils/helper';
import { KeyboardTypeOptions, TextInput, View } from 'react-native';
import { neutral } from 'tailwindcss/colors';

type InputProps = {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
};

const { width } = getDimension();

export function Input({
  placeholder,
  keyboardType,
  secureTextEntry,
}: InputProps) {
  return (
    <View>
      <TextInput
        placeholderTextColor={neutral[600]}
        style={{ width: width * 0.85 }}
        className="bg-primary-50 text-xl font-bold px-5 py-3 rounded-full"
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
