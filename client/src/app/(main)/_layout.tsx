import { Redirect, Slot } from 'expo-router';
import { TabBar } from '@/components/shared/tab-bar/tab-bar';
import { View } from 'react-native';
import { Loader } from '@/components/ui/loader';
import { useGetAuth } from '@/hooks/use-get-auth';

export default function MainLayout() {
  const { auth, isLoading } = useGetAuth();

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-bg-dark">
        <Loader />
      </View>
    );

  if (!auth) return <Redirect href={'/login'} />;

  return (
    <View className="flex-1 justify-between bg-bg-dark">
      <View className="px-6">
        <Slot />
      </View>
      <TabBar />
    </View>
  );
}
