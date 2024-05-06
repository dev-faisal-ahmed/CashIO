import { ScreenHeader } from '@/components/shared/screen-header/screen-header';
import { useGetAuth } from '@/hooks/use-get-auth';
import { getDimension } from '@/utils/helpers/ui.helper';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Loader } from '@/components/ui/loader';
import { useSourceDetailsServices } from '@/store/use-source-details-services';
import { TransactionDetails } from './_components/transaction-details';
import { useContainer } from '@/hooks/use-container';

const { height } = getDimension();

export default function SourceDetails() {
  const { auth } = useGetAuth();
  const { sourceId } = useLocalSearchParams();
  const { fetch, sourceDetails, loading } = useSourceDetailsServices();
  const { containerSize, handleLayout } = useContainer();

  useEffect(() => {
    if (sourceId) fetch(sourceId as string);
  }, [sourceId]);

  if (loading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <View style={{ height: height - 135, position: 'relative' }}>
      <ScreenHeader auth={auth!} />
      {sourceDetails?.source ? (
        <>
          <View onLayout={handleLayout} className="mt-8">
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-bold text-xl">
                {sourceDetails.source.name}
              </Text>
              <AntDesign name="edit" size={24} color="white" />
            </View>
            <View className="border-b border-card-bg-dark pb-3 mt-10">
              {sourceDetails.transactionDetails?.income > 0 && (
                <Text className="text-white font-bold text-2xl">
                  <Text>Income: </Text>{' '}
                  {sourceDetails.transactionDetails.income}
                </Text>
              )}

              {sourceDetails.transactionDetails?.expense > 0 && (
                <Text className="text-white font-bold text-2xl">
                  Expense : {sourceDetails.transactionDetails.expense}
                </Text>
              )}
            </View>
          </View>

          <View>
            {sourceDetails.transactionDetails.transactions.length ? (
              <>
                <Text className="text-white text-base font-bold mt-8 mb-6">
                  Wallet History
                </Text>
                <FlatList
                  style={{
                    height: containerSize.height
                      ? height - 300 - containerSize.height
                      : 200,
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ gap: 16 }}
                  data={sourceDetails.transactionDetails.transactions}
                  renderItem={({ item: source }) => (
                    <TransactionDetails key={source._id} {...source} />
                  )}
                />
              </>
            ) : (
              <Text className="text-white font-bold text-center mt-8">
                No Transactions Found
              </Text>
            )}
          </View>
        </>
      ) : (
        <Text className="text-white font-bold text-center mt-6">
          No Source Found
        </Text>
      )}
    </View>
  );
}
