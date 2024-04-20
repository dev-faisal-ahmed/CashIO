import { useAuth } from '@/hooks/use-auth';
import { toastConfig } from '@/utils/helpers/toast.helper';
import { Stack, router, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const { auth } = useAuth();
  const segment = useSegments();
  console.log(segment);

  useEffect(() => {
    console.log(auth);
    if (!auth && segment[0] === '(main)') router.replace('/login');
  }, [auth]);

  return (
    <SafeAreaView className="bg-bg-dark flex-1 pt-2">
      <Stack>
        <Stack.Screen
          name="(main)"
          options={{ headerShown: false, animation: 'simple_push' }}
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
