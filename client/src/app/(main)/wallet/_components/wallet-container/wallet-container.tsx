import { getIcon } from '@/components/shared/icon/icon-helper';
import { useContainer } from '@/hooks/use-container';
import { TWallet } from '@/utils/types/data.types';
import { Text, View } from 'react-native';

export function WalletContainer({ name, icon }: TWallet) {
  const { containerWidth, handleLayout } = useContainer();
  return (
    <View onLayout={handleLayout}>
      <View
        style={{ width: containerWidth, height: containerWidth }}
        className="bg-card-bg-dark items-center justify-center rounded-full"
      >
        {getIcon({ name: icon.name, size: 24 })[icon.group]}
      </View>
      <Text className="text-white font-bold text-center mt-2">{name}</Text>
    </View>
  );
}
