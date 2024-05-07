import { Loader } from '@/components/ui/loader';
import { useTransactionServices } from '@/store/use-transaction-services';
import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { TransactionContainer } from './transaction-container';

export function Transactions() {
  const { fetch, transactions, loading } = useTransactionServices();

  useEffect(() => {
    fetch();
  }, []);

  if (loading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 16 }}
      data={transactions}
      renderItem={({ item }) => <TransactionContainer {...item} />}
      keyExtractor={(item) => item._id}
    />
  );
}
