import { getDimension } from '@/utils/helpers/ui.helper';
import { Text, View } from 'react-native';
import { TIcon } from '../icon/icon-helper';
import { Icon } from '../icon/icon';

type IconContainerProps = {
  name: string;
  icon: TIcon;
};

const { width } = getDimension();
const containerSize = (width - 48 - 72) / 4;

export function IconContainer({ name, icon }: IconContainerProps) {
  return (
    <View className="mb-6">
      <View
        style={{ width: containerSize, height: containerSize }}
        className="bg-card-bg-dark items-center justify-center rounded-full"
      >
        <Icon name={icon.name} group={icon.group} size={24} />
      </View>
      <Text className="text-white font-bold text-center mt-2">{name}</Text>
    </View>
  );
}
