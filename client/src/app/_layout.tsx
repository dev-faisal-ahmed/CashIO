import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View className="bg-bg-dark flex-1">
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="register/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="register/more-info/index"
          options={{ headerShown: false }}
        />
      </Stack>
    </View>
  );
}
