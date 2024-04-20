import { useFirebaseAuth } from '@/hooks/use-firebase-auth';
import { useAuth } from '@/store/auth';
import { toastConfig } from '@/utils/helpers/toast.helper';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const { auth } = useFirebaseAuth();
  const { updateUser } = useAuth((state) => state);

  useEffect(() => {
    updateUser(auth);
  }, []);

  return (
    <SafeAreaView className="bg-bg-dark flex-1 pt-2">
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
    </SafeAreaView>
  );
}
