import { Slot } from 'expo-router';
import { TabBar } from '@/components/shared/tab-bar/tab-bar';
import { View } from 'react-native';
import { colors } from '@/themes/colors';

export default function MainLayout() {
  return (
    <View
      style={{ backgroundColor: colors.bg.dark }}
      className="h-screen flex justify-between pt-12"
    >
      <View className="px-6">
        <Slot />
      </View>
      <TabBar />
    </View>
  );
}
