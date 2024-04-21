import { toastConfig } from '@/utils/helpers/toast.helper';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <SafeAreaView className="bg-bg-dark flex-1 pt-4">
      <Stack>
        <Stack.Screen
          name="(main)"
          options={{ headerShown: false, animation: 'none' }}
        />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="register/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="register/more-info/index"
          options={{ headerShown: false }}
        />
      </Stack>
      <Toast config={toastConfig} visibilityTime={2500} />
    </SafeAreaView>
  );
}
