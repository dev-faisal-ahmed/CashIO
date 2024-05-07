import { ScreenHeader } from '@/components/shared/screen-header/screen-header';
import { useGetAuth } from '@/hooks/use-get-auth';
import { useWalletDetailsServices } from '@/store/use-wallet-details-services';
import { getDimension } from '@/utils/helpers/ui.helper';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Loader } from '@/components/ui/loader';
import { TransactionDetails } from './_components/transaction-details';
import { EditWallet } from './_components/edit-wallet/edit-wallet';

const { height } = getDimension();

export default function WalletInfo() {
  const { auth } = useGetAuth();
  const { walletId } = useLocalSearchParams();
  const { fetch, walletDetails, loading } = useWalletDetailsServices();
  const [showEditWalletModal, setShowEditWalletModal] = useState(false);

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
    <>
      <View style={{ height: height - 135, position: 'relative' }}>
        <ScreenHeader auth={auth!} />
        {walletDetails?.wallet ? (
          <View className="mt-8">
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-bold text-xl">
                {walletDetails.wallet.name}
              </Text>
              <TouchableOpacity onPress={() => setShowEditWalletModal(true)}>
                <AntDesign name="edit" size={24} color="white" />
              </TouchableOpacity>
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
                  <FlatList
                    style={{ height: height - 460 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 16 }}
                    data={walletDetails.transactions}
                    renderItem={({ item: wallet }) => (
                      <TransactionDetails key={wallet._id} {...wallet} />
                    )}
                  />
                </>
              ) : (
                <Text className="text-white font-bold text-center mt-8">
                  No Transactions Found
                </Text>
              )}
            </View>
            <EditWallet
              showModal={showEditWalletModal}
              onCloseModal={() => setShowEditWalletModal(false)}
              icon={walletDetails.wallet.icon}
              previousName={walletDetails.wallet.name}
              saving={walletDetails.wallet.saving}
              walletId={walletId as string}
            />
          </View>
        ) : (
          <Text className="text-white font-bold text-center mt-6">
            No Wallet Found
          </Text>
        )}
      </View>
    </>
  );
}
