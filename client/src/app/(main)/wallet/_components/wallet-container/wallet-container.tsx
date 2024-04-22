import { getIcon } from '@/components/shared/icon/icon-helper';
import { TWallet } from '@/utils/types/data.types';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export function WalletContainer({ name, icon }: TWallet) {
  return (
    <View>
      <View className="w-16 h-16 bg-card-bg-dark items-center justify-center rounded-full">
        {getIcon({ name: icon.name, size: 32 })[icon.group]}
      </View>
      <Text className="text-white font-bold text-center mt-2">{name}</Text>
    </View>
  );
}
