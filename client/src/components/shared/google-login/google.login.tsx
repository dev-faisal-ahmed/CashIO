import { Button } from '@/components/ui/button';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native';

export function GoogleLogin() {
  return (
    <Button customClass="mt-8 w-full bg-primary-300 flex-row justify-center">
      <AntDesign name="google" size={24} color={'white'} />
      <Text className="text-lg font-bold ml-3 text-white">
        Continue With Google
      </Text>
    </Button>
  );
}
