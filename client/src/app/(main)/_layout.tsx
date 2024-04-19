import { Slot } from 'expo-router';
import { TabBar } from '@/components/tab-bar/tab-bar';
import { View } from 'react-native';

export default function MainLayout() {
  return (
    <View className="h-screen flex justify-between pt-10 bg-primary-50">
      <View className="px-5">
        <Slot />
      </View>
      <TabBar />
    </View>
  );
}
