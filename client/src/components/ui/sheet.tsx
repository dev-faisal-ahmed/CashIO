import {
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { getDimension } from '@/utils/helpers/ui.helper';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type SheetProps = PropsWithChildren & {
  isOpen: boolean;
  close: () => void;
  position?: 'TOP' | 'BOTTOM';
  style?: StyleProp<ViewStyle>;
  sheetWidth?: number;
};

const { height, width } = getDimension();

export function Sheet({
  isOpen,
  close,
  children,
  position = 'BOTTOM',
  style,
  sheetWidth,
}: SheetProps) {
  return isOpen ? (
    <TouchableOpacity
      onPress={close}
      style={{ height, width: sheetWidth ? sheetWidth : width }}
      className="absolute z-10 flex-1"
    >
      <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
        <View
          style={[{ padding: 24 }, style]}
          className={twMerge(
            'bg-card-bg-dark rounded-3xl',
            position === 'TOP' ? 'rounded-t-none' : '',
            position === 'BOTTOM' ? 'mt-auto pb-12' : ''
          )}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  ) : null;
}
