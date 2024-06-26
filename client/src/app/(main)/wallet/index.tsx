import { Loader } from '@/components/ui/loader';
import { useGetAuth } from '@/hooks/use-get-auth';
import { FlatList, Text, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Entypo } from '@expo/vector-icons';
import { colors } from '@/themes/colors';
import { getDimension } from '@/utils/helpers/ui.helper';
import { AddWallet } from './_components/add-wallet/add-wallet';
import { useEffect, useState } from 'react';
import { useWalletsServices } from '@/store/use-wallets-services';
import { ScreenHeader } from '@/components/shared/screen-header/screen-header';
import { IconContainer } from '@/components/shared/icon-container/icon-container';
import { Link } from 'expo-router';

const { height } = getDimension();

export default function Wallet() {
  const { auth, isLoading } = useGetAuth();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { wallets, fetch, loading } = useWalletsServices((state) => state);

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
    <View style={{ height: height - 120, position: 'relative' }}>
      <ScreenHeader auth={auth!} />

      <Text className="text-white text-center text-2xl my-6">Wallets</Text>
      {/* wallets list */}
      <FlatList
        horizontal={false}
        data={wallets}
        numColumns={4}
        renderItem={(eachData) => (
          <Link href={`wallet/${eachData.item._id}`}>
            <IconContainer {...eachData.item} />
          </Link>
        )}
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
        showModal={showWalletModal}
        onCloseModal={() => setShowWalletModal(false)}
      />
    </View>
  );
}
