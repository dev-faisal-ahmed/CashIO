import { ProfileIcon } from '@/components/shared/profile-icon/profile-icon';
import { Loader } from '@/components/ui/loader';
import { useGetAuth } from '@/hooks/use-get-auth';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { Entypo } from '@expo/vector-icons';
import { colors } from '@/themes/colors';
import { getDimension } from '@/utils/helpers/ui.helper';
import { AddWallet } from './_components/add-wallet/add-wallet';
import { useEffect, useState } from 'react';
import { useWalletServices } from '@/store/use-wallet-services';

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
      <View className="flex-1">
        <Loader />
      </View>
    );

  console.log(wallets);

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
      <Text className="text-white text-center text-2xl">Wallets</Text>
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
