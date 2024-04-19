import {
  generateTabBarLinksLeft,
  generateTabBarLinksRight,
} from './tab-bar-routes';
import { View } from 'react-native';
import { Tab } from './tab';
import { usePathname } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/themes/colors';

export function TabBar() {
  const path = usePathname();

  return (
    <View className="flex-row w-full justify-between px-5 py-2">
      {generateTabBarLinksLeft(path).map((link) => (
        <Tab key={link.url} {...link} />
      ))}

      <View
        style={{ borderRadius: 24 }}
        className="border-primary-500 border-2 h-16 w-16 flex items-center justify-center -mt-6"
      >
        <AntDesign name="plus" size={30} color={colors.primary[500]} />
      </View>

      {generateTabBarLinksRight(path).map((link) => (
        <Tab key={link.url} {...link} />
      ))}
    </View>
  );
}
