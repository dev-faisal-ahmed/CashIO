import { getIcon } from '@/components/shared/icon/icon-helper';
import { getDimension } from '@/utils/helpers/ui.helper';
import { TWallet } from '@/utils/types/data.types';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const { width } = getDimension();
const eachSize = (width - 48 - 72) / 4;

export function WalletContainer({ name, icon }: TWallet) {
  return (
    <View className="mb-6">
      <View
        style={{ height: eachSize, width: eachSize }}
        className="bg-card-bg-dark items-center justify-center rounded-full"
      >
        {getIcon({ name: icon.name, size: 24 })[icon.group]}
      </View>
      <Text className="text-white font-bold text-center mt-2">{name}</Text>
    </View>
  );
}
