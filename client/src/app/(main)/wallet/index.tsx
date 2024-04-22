import { ProfileIcon } from '@/components/shared/profile-icon/profile-icon';
import { Loader } from '@/components/ui/loader';
import { useGetAuth } from '@/hooks/use-get-auth';
import { FlatList, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { Entypo } from '@expo/vector-icons';
import { colors } from '@/themes/colors';
import { getDimension } from '@/utils/helpers/ui.helper';
import { AddWallet } from './_components/add-wallet/add-wallet';
import { useEffect, useState } from 'react';
import { useWalletServices } from '@/store/use-wallet-services';
import { WalletContainer } from './_components/wallet-container/wallet-container';

const { height } = getDimension();

export default function Wallet() {
  const { auth, isLoading } = useGetAuth();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { wallets, fetch, loading } = useWalletServices((state) => state);

  useEffect(() => {
    fetch();
  }, []);

  if (isLoading || loading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <View style={{ height: height - 120 }} className="relative">
      <View className="flex-row items-center justify-between">
        <ProfileIcon imageUrl={auth?.photoURL!} name={auth?.displayName!} />
        <MaterialCommunityIcons
          name="calculator-variant-outline"
          size={32}
          color="white"
        />
      </View>
      <Text className="text-white text-center text-2xl my-6">Wallets</Text>
      {/* wallets list */}
      <FlatList
        horizontal={false}
        data={wallets}
        numColumns={4}
        renderItem={(eachData) => <WalletContainer {...eachData.item} />}
        keyExtractor={(eachData) => eachData._id}
        columnWrapperStyle={{ gap: 24 }}
      />
      {/* add wallet */}
      <View className="items-center absolute bottom-4 right-0">
        <Button
          onPress={() => setShowWalletModal(true)}
          customClass="bg-card-bg-dark p-4 pl-5 rounded-2xl flex-row justify-center"
        >
          <Text
            style={{ fontWeight: '500' }}
            className="text-primary-500 mr-1 "
          >
            New Wallet
          </Text>
          <Entypo name="plus" size={24} color={colors.primary[500]} />
        </Button>
      </View>
      <AddWallet
        showWalletModal={showWalletModal}
        onCloseWalletModal={() => setShowWalletModal(false)}
      />
    </View>
  );
}
