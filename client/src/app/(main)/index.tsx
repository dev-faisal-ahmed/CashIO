import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/auth';
import { toast } from '@/utils/helpers/toast.helper';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function Home() {
  const { auth, updateUser } = useAuth((state) => state);

  const showToast = async () => {
    toast.success(auth?.displayName!);
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
