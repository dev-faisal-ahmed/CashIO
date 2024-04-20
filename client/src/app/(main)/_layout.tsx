import { Slot } from 'expo-router';
import { TabBar } from '@/components/shared/tab-bar/tab-bar';
import { View } from 'react-native';

export default function MainLayout() {
  return (
    <View className="h-screen flex justify-between pt-12 bg-bg-dark">
      <View className="px-6">
        <Slot />
      </View>
      <TabBar />
    </View>
  );
}
