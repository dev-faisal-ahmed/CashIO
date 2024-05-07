import { Icon } from '@/components/shared/icon/icon';
import { dateHelper } from '@/utils/helpers/date.helper';
import { TTransfer } from '@/utils/types/data.types';
import { Text, View } from 'react-native';

export function TransferContainer({
  amount,
  receiverWalletId,
  senderWalletId,
  date,
}: TTransfer) {
  return (
    <View className="border-b border-card-bg-dark pb-4 flex-row items-center  justify-between">
      <View style={{ gap: 16 }} className="flex-row items-center">
        <View className="w-10 h-10 rounded-lg bg-card-bg-dark items-center justify-center">
          <Icon {...receiverWalletId.icon} />
        </View>
        <View>
          <Text className="text-white text-base">
            Receiver : {receiverWalletId.name}
          </Text>
          <Text className="text-white text-base">
            Sender : {senderWalletId.name}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-white text-xl">৳ {amount}</Text>
        <Text className="text-neutral-300">{dateHelper(date)}</Text>
      </View>
    </View>
  );
}
