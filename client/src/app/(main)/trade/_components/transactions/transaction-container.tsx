import { Icon } from '@/components/shared/icon/icon';
import { dateHelper } from '@/utils/helpers/date.helper';
import { TTransaction } from '@/utils/types/data.types';
import { Text, View } from 'react-native';

export function TransactionContainer({
  sourceId,
  walletId,
  amount,
  date,
  type,
}: TTransaction) {
  return (
    <View className="border-b border-card-bg-dark pb-4 flex-row justify-between">
      <View style={{ gap: 16 }} className="flex-row items-center">
        <View className="w-12 h-12 bg-card-bg-dark flex items-center justify-center rounded-lg">
          <Icon name={sourceId.icon.name} group={sourceId.icon.group} />
        </View>
        <View>
          <Text className="text-white text-base font-bold">
            {sourceId.name}
          </Text>
          <Text className="text-neutral-300 mt-1">{dateHelper(date)}</Text>
        </View>
      </View>
      <View>
        <Text className="text-xl text-white font-bold text-right">
          {type === 'INCOME' ? '+ ' : '- '}৳ {amount}
        </Text>
        <Text className="text-neutral-300 text-xs text-right mt-1">
          {' '}
          Wallet: {walletId.name}
        </Text>
      </View>
    </View>
  );
}
