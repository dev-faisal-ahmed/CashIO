import { getDimension } from '@/utils/helpers/ui.helper';
import { PropsWithChildren } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const { height, width } = getDimension();

type SheetProps = PropsWithChildren & {
  isOpen: boolean;
  close: () => void;
  position?: 'TOP' | 'BOTTOM';
};

export function Sheet({
  isOpen,
  close,
  children,
  position = 'BOTTOM',
}: SheetProps) {
  return isOpen ? (
    <TouchableOpacity
      onPress={close}
      style={{ width, height: height }}
      className="absolute z-10 flex-1"
    >
      <View
        className={twMerge(
          'p-6 bg-card-bg-dark rounded-3xl',
          position === 'TOP' ? 'rounded-t-none' : '',
          position === 'BOTTOM' ? 'mt-auto pb-12' : ''
        )}
      >
        {children}
      </View>
    </TouchableOpacity>
  ) : null;
}
