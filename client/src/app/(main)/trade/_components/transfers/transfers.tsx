import { useTransferServices } from '@/store/use-transfer-services';
import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { TransferContainer } from './transfer-container';
import { Loader } from '@/components/ui/loader';

export function Transfers() {
  const { transfers, fetch, loading } = useTransferServices();

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
    <View className="mt-6">
      <FlatList
        data={transfers}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => <TransferContainer {...item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
