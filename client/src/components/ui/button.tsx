import { PropsWithChildren } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

type ButtonProps = PropsWithChildren & {
  onPress?: (event: GestureResponderEvent) => void;
  customClass?: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({ children, onPress, customClass }: ButtonProps) {
  return (
    <TouchableOpacity
      className={twMerge(
        'bg-primary-500 px-5 py-3 items-center rounded-full',
        customClass
      )}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
