import { ScreenHeader } from '@/components/shared/screen-header/screen-header';
import { useGetAuth } from '@/hooks/use-get-auth';
import { useWalletDetailsServices } from '@/store/use-wallet-details-services';
import { getDimension } from '@/utils/helpers/ui.helper';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Loader } from '@/components/ui/loader';
import { TransactionDetails } from './_components/transaction-details';

const { height } = getDimension();

export default function WalletInfo() {
  const { auth } = useGetAuth();
  const { walletId } = useLocalSearchParams();
  const { fetch, walletDetails, loading } = useWalletDetailsServices();

  useEffect(() => {
    if (walletId) fetch(walletId as string);
  }, [walletId]);

  if (loading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <View style={{ height: height - 120, position: 'relative' }}>
      <ScreenHeader auth={auth!} />
      {walletDetails?.wallet ? (
        <ScrollView className="mt-8">
          <View className="flex-row items-center justify-between">
            <Text className="text-white font-bold text-xl">
              {walletDetails.wallet.name}
            </Text>
            <AntDesign name="edit" size={24} color="white" />
          </View>
          <Text className="text-white text-5xl text-center py-12 border-b border-card-bg-dark">
            ৳ {walletDetails.wallet.income - walletDetails.wallet.expense}
          </Text>

          <View>
            {walletDetails?.transactions?.length ? (
              <>
                <Text className="text-white text-base font-bold mt-8 mb-6">
                  Wallet History
                </Text>
                {walletDetails.transactions.map((wallet) => (
                  <TransactionDetails key={wallet._id} {...wallet} />
                ))}
              </>
            ) : (
              <Text className="text-white font-bold text-center mt-8">
                No Transactions Found
              </Text>
            )}
          </View>
        </ScrollView>
      ) : (
        <Text className="text-white font-bold text-center mt-6">
          No Wallet Found
        </Text>
      )}
    </View>
  );
}
