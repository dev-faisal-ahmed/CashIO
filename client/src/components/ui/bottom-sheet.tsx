import { getDimension } from '@/utils/helpers/ui.helper';
import { PropsWithChildren } from 'react';
import { TouchableOpacity, View } from 'react-native';

const { height, width } = getDimension();

type BottomSheetProps = PropsWithChildren & {
  isOpen: boolean;
  close: () => void;
};

export function BottomSheet({ isOpen, close, children }: BottomSheetProps) {
  return isOpen ? (
    <TouchableOpacity
      onPress={close}
      style={{ width, height: height }}
      className="absolute z-10 flex-1"
    >
      <View className="mt-auto p-6 bg-card-bg-dark rounded-3xl pb-12">
        {children}
      </View>
    </TouchableOpacity>
  ) : null;
}
