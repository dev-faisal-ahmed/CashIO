import { Text, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

type BalanceCardProps = {
  income: number;
  expense: number;
};

export function BalanceCard({ income, expense }: BalanceCardProps) {
  return (
    <View className="flex-row mt-6 items-center">
      <View>
        <View
          style={{ gap: 16 }}
          className="flex-row items-center justify-between"
        >
          <View>
            <View className="bg-card-bg-dark p-4 rounded-full">
              <SimpleLineIcons name="wallet" size={40} color={'white'} />
            </View>
          </View>
          <View>
            <Text className="text-base text-primary-500 font-bold">
              Balance
            </Text>
            <Text className="text-white text-3xl mt-3 font-bold">
              ৳ {income - expense}
            </Text>
          </View>
        </View>
      </View>

      <View className="ml-auto">
        <View style={{ gap: 16 }} className="items-center flex-row">
          <View>
            <View className="bg-success rounded-full h-10 w-10 items-center justify-center">
              <FontAwesome5 name="sort-amount-up" size={20} color="white" />
            </View>
          </View>
          <View>
            <Text className="text-neutral-300 text-right">Income</Text>
            <Text className="text-xl font-bold text-white">৳ {income}</Text>
          </View>
        </View>

        <View style={{ gap: 16 }} className="items-center flex-row mt-4">
          <View>
            <View className="bg-error-500 rounded-full h-10 w-10 items-center justify-center">
              <FontAwesome6
                name="arrow-down-wide-short"
                size={20}
                color="white"
              />
            </View>
          </View>
          <View>
            <Text className="text-neutral-300 text-right">Expense</Text>
            <Text className="text-xl font-bold text-white">৳ {expense}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
