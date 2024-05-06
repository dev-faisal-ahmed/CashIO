import { FlatList, Text, View } from 'react-native';
import { getDimension } from '@/utils/helpers/ui.helper';
import { ScreenHeader } from '@/components/shared/screen-header/screen-header';
import { useGetAuth } from '@/hooks/use-get-auth';
import { useMetaServices } from '@/store/use-meta-services';
import { useEffect } from 'react';
import { BalanceCard } from './_component/balance-card';
import { BudgetCard } from './_component/budget-card';

const { height } = getDimension();

export default function Home() {
  const { auth } = useGetAuth();
  const { metaData, fetch } = useMetaServices();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <View style={{ height: height - 135, position: 'relative' }}>
      <ScreenHeader auth={auth!} />
      <BalanceCard
        income={metaData?.userInfo.income || 0}
        expense={metaData?.userInfo.expense || 0}
      />
      <Text className="text-white mt-10 font-bold text-lg">Budgets</Text>
      {metaData?.sources.length ? (
        <FlatList
          style={{ marginTop: 24 }}
          contentContainerStyle={{ gap: 16 }}
          data={metaData?.sources}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item: data }) => (
            <BudgetCard expense={data.expense} info={data.info} />
          )}
        />
      ) : (
        <Text className="text-white text-center font-bold mt-6">
          No Budget Is Set
        </Text>
      )}
    </View>
  );
}
