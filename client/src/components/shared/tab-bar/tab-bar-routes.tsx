import { colors } from '@/themes/colors';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const generateIconColor = (url: string, activeUrl: string) => {
  return url === activeUrl ? colors.primary[500] : 'white';
};

export const generateTabBarLinksLeft = (activeUrl: string) => {
  return [
    {
      activeUrl: activeUrl,
      url: '/',
      icon: (
        <Feather
          name="home"
          size={24}
          color={generateIconColor('/', activeUrl)}
        />
      ),
      title: 'Home',
    },

    {
      activeUrl: activeUrl,
      url: '/wallet',
      icon: (
        <SimpleLineIcons
          name="wallet"
          size={24}
          color={generateIconColor('/wallet', activeUrl)}
        />
      ),
      title: 'Wallet',
    },
  ];
};

export const generateTabBarLinksRight = (activeUrl: string) => {
  return [
    {
      activeUrl: activeUrl,
      url: '/trade',
      icon: (
        <AntDesign
          name="creditcard"
          size={24}
          color={generateIconColor('/trade', activeUrl)}
        />
      ),
      title: 'Tarde',
    },
    {
      activeUrl: activeUrl,
      url: '/source',
      icon: (
        <MaterialIcons
          name="category"
          size={24}
          color={generateIconColor('/source', activeUrl)}
        />
      ),
      title: 'Source',
    },
  ];
};
