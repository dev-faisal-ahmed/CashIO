import { Button } from '@/components/ui/button';
import { toast } from '@/utils/helpers/toast.helper';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { AUTH } from '@/utils/firebase.config';

export default function Home() {
  const handleLogout = async () => {
    await signOut(AUTH);
    toast.success('Logout Done!');
  };

  return (
    <View>
      <StatusBar style="light" />
      <Text className="text-white">Home Screen</Text>
      <Button
        customClass="mt-8 bg-red-500 mx-auto min-w-[180px]"
        onPress={handleLogout}
      >
        <Text className="text-white font-bold text-base">Logout</Text>
      </Button>
    </View>
  );
}
