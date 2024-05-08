import { TouchableOpacity, View } from 'react-native';
import { ProfileIcon } from '../profile-icon/profile-icon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User } from 'firebase/auth';
import { useState } from 'react';
import { ProfileModal } from './profile-modal';

type ScreenHeaderPops = {
  auth: User;
};

export function ScreenHeader({ auth }: ScreenHeaderPops) {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={() => setExpand(true)}>
          <ProfileIcon imageUrl={auth?.photoURL!} name={auth?.displayName!} />
        </TouchableOpacity>
        <MaterialCommunityIcons
          name="calculator-variant-outline"
          size={32}
          color="white"
        />
      </View>
      <ProfileModal show={expand} onClose={() => setExpand(false)} />
    </>
  );
}
