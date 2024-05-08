import { Icon } from '@/components/shared/icon/icon';
import { TIcon } from '@/components/shared/icon/icon-helper';
import { Text, View } from 'react-native';

type BalanceCardProps = {
  info: {
    name: string;
    icon: TIcon;
    budget: number;
  };
  expense: number;
};

export function BudgetCard({ info, expense }: BalanceCardProps) {
  return (
    <View style={{ gap: 16 }} className="flex-row">
      <View className="bg-card-bg-dark h-12 w-12 items-center justify-center rounded-lg">
        <Icon name={info.icon.name} group={info.icon.group} size={32} />
      </View>
      <View className="flex-1">
        <Text className="text-white font-bold text-base mb-3">{info.name}</Text>
        <View className="bg-card-bg-dark flex-1 flex-row rounded-full overflow-hidden">
          <View
            style={{ flex: expense / info.budget }}
            className="bg-error-500"
          />
        </View>
      </View>
    </View>
  );
}
