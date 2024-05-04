import { getIcon } from '@/components/shared/icon/icon-helper';
import { dateHelper } from '@/utils/helpers/date.helper';
import { TWalletDetailsTransaction } from '@/utils/types/data.types';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function TransactionDetails({
  sourceId,
  amount,
  date,
  type,
}: TWalletDetailsTransaction) {
  return (
    <View className="border-b flex-row items-center justify-between border-card-bg-dark pb-4">
      <View style={{ gap: 16 }} className="flex-row items-center">
        <View className="bg-card-bg-dark rounded-lg p-2">
          {getIcon({ name: sourceId.icon.name, size: 32 })[sourceId.icon.group]}
        </View>
        <View>
          <Text className="text-base text-white font-bold">
            {sourceId.name}
          </Text>
          <Text className="text-neutral-300 mt-1">{dateHelper(date)}</Text>
        </View>
      </View>
      <Text className="text-white text-2xl font-bold">
        <Text>{type === 'INCOME' ? '+ ' : '- '}</Text>৳ {amount}
      </Text>
    </View>
  );
}
