import { Button } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function Home() {
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Go to',
      position: 'top',
    });
  };
  return (
    <View>
      <StatusBar style="light" />
      <Text className="text-white">Home Screen</Text>
      <Button customClass="mt-4" onPress={showToast}>
        <Text>Show toast</Text>
      </Button>
    </View>
  );
}
