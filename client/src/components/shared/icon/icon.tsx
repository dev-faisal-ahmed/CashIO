import { TIconGroup, TIconName, getIcon } from './icon-helper';

type IconProps = {
  name: TIconName;
  group: TIconGroup;
  size?: number;
};

export function Icon({ name, group, size = 24 }: IconProps) {
  return <>{getIcon({ name, size })[group]}</>;
}
