import { View } from 'react-native';
import { ProfileIcon } from '../profile-icon/profile-icon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User } from 'firebase/auth';

type ScreenHeaderPops = {
  auth: User;
};

export function ScreenHeader({ auth }: ScreenHeaderPops) {
  return (
    <View className="flex-row items-center justify-between">
      <ProfileIcon imageUrl={auth?.photoURL!} name={auth?.displayName!} />
      <MaterialCommunityIcons
        name="calculator-variant-outline"
        size={32}
        color="white"
      />
    </View>
  );
}
