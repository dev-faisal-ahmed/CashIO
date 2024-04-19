import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View>
      <StatusBar style="light" />
      <Text className="text-white">Home Screen</Text>
    </View>
  );
}
