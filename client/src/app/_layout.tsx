import { toastConfig } from '@/utils/helpers/toast.helper';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <View className="bg-bg-dark flex-1">
      <Stack>
        <Stack.Screen
          name="(main)"
          options={{ headerShown: false, animation: 'simple_push' }}
        />
        <Stack.Screen name="register/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="register/more-info/index"
          options={{ headerShown: false }}
        />
      </Stack>
      <Toast config={toastConfig} visibilityTime={2500} />
    </View>
  );
}
