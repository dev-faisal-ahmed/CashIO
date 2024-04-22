import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Entypo,
  FontAwesome5,
  FontAwesome6,
} from '@expo/vector-icons';
import { icons } from './icons';

// type of all icons group

type TFontAwesomeName = keyof typeof icons.FontAwesome;
type TMaterialCommunityIconsName = keyof typeof icons.MaterialCommunityIcons;
type TEntypoName = keyof typeof icons.Entypo;
type TMaterialIconsName = keyof typeof icons.MaterialIcons;
type TIoniconsName = keyof typeof icons.Ionicons;
type TFontAwesome5Name = keyof typeof icons.FontAwesome5;
type FontAwesome6Name = keyof typeof icons.FontAwesome6;

export type TIconName =
  | TFontAwesomeName
  | TMaterialCommunityIconsName
  | TEntypoName
  | TMaterialIconsName
  | TIoniconsName
  | TFontAwesome5Name
  | FontAwesome6Name;

export type TIconGroup = keyof typeof icons;

export type TIcon = {
  group: TIconGroup;
  name: TIconName;
};

type TGetIcon = {
  size?: number;
  color?: string;
  name: TIconName;
};

export const getIcon = ({ size = 24, color = 'white', name }: TGetIcon) => {
  return {
    FontAwesome: (
      <FontAwesome name={name as TFontAwesomeName} size={size} color={color} />
    ),

    MaterialCommunityIcons: (
      <MaterialCommunityIcons
        name={name as TMaterialCommunityIconsName}
        size={size}
        color={color}
      />
    ),
    Entypo: <Entypo name={name as TEntypoName} size={size} color={color} />,

    MaterialIcons: (
      <MaterialIcons
        name={name as TMaterialIconsName}
        size={size}
        color={color}
      />
    ),

    Ionicons: (
      <Ionicons name={name as TIoniconsName} size={size} color={color} />
    ),

    FontAwesome5: (
      <FontAwesome5
        name={name as TFontAwesome5Name}
        size={size}
        color={color}
      />
    ),
    FontAwesome6: (
      <FontAwesome6 name={name as FontAwesome6Name} size={size} color={color} />
    ),
  };
};
