import { TouchableOpacity, View } from 'react-native';
import { ProfileIcon } from '../profile-icon/profile-icon';
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
      </View>
      <ProfileModal show={expand} onClose={() => setExpand(false)} />
    </>
  );
}
