import { ScreenHeader } from '@/components/shared/screen-header/screen-header';
import { Loader } from '@/components/ui/loader';
import { useGetAuth } from '@/hooks/use-get-auth';
import { getDimension } from '@/utils/helpers/ui.helper';
import { Children, useState } from 'react';
import { Text, View } from 'react-native';
import { AddSource } from './_components/add-source/add-source';
import { Button } from '@/components/ui/button';
import { colors } from '@/themes/colors';
import { Entypo } from '@expo/vector-icons';
import { useSourceServices } from '@/store/use-source-services';

const { height } = getDimension();

export default function Source() {
  const { auth, isLoading } = useGetAuth();
  const [showSourceModal, setShowSourceModal] = useState(false);
  const { sources, loading } = useSourceServices();

  console.log(sources);

  if (isLoading || loading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <View style={{ height: height - 120 }} className="relative">
      <ScreenHeader auth={auth!} />
      <Text className="text-white text-center text-2xl my-6">Sources</Text>

      {/* <FlatList
        horizontal={false}
        data={wallets}
        numColumns={4}
        renderItem={(eachData) => <WalletContainer {...eachData.item} />}
        keyExtractor={(eachData) => eachData._id}
        columnWrapperStyle={{ gap: 24 }}
      />

      
      
      <AddWallet
        showWalletModal={showWalletModal}
        onCloseWalletModal={() => setShowWalletModal(false)}
      /> */}
      <View className="items-center absolute bottom-4 right-0">
        <Button
          onPress={() => setShowSourceModal(true)}
          customClass="bg-card-bg-dark p-4 pl-5 rounded-2xl flex-row justify-center"
        >
          <Text
            style={{ fontWeight: '500' }}
            className="text-primary-500 mr-1 "
          >
            New Source
          </Text>
          <Entypo name="plus" size={24} color={colors.primary[500]} />
        </Button>
      </View>

      <AddSource
        showModal={showSourceModal}
        onCloseModal={() => setShowSourceModal(false)}
      />
    </View>
  );
}
