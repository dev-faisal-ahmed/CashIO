import { getIcon } from '@/components/shared/icon/icon-helper';
import { TWallet } from '@/utils/types/data.types';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export function WalletContainer({ name, icon }: TWallet) {
  return (
    <View className="mb-6">
      <View className="w-14 h-14 bg-card-bg-dark items-center justify-center rounded-full">
        {getIcon({ name: icon.name, size: 24 })[icon.group]}
      </View>
      <Text className="text-white font-bold text-center mt-2">{name}</Text>
    </View>
  );
}
