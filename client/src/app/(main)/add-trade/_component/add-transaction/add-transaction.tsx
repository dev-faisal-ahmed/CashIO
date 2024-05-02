import {
  Modal,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useAddTransaction } from './use-add-transaction';
import { MaterialIcons } from '@expo/vector-icons';
import { Loader } from '@/components/ui/loader';
import { ActiveButton } from './active-button';
import { CloseModal } from '@/components/ui/close-modal';
import { getDimension } from '@/utils/helpers/ui.helper';
import { getIcon } from '@/components/shared/icon/icon-helper';
import { FontAwesome5 } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';

const { width } = getDimension();

type AddTransactionProps = { tardeType: 'EXPENSE' | 'INCOME'; amount: string };

export function AddTransaction({ tardeType, amount }: AddTransactionProps) {
  const {
    states: {
      sources,
      wallets,
      remSources,
      remWallets,
      sourceLoading,
      walletLoading,
      selectedSource,
      selectedWallet,
      showSources,
      showWallets,
    },
    handlers: {
      onSourceUpdate,
      setShowSources,
      onWalletUpdate,
      setShowWallets,
    },
  } = useAddTransaction({ amount, tardeType });

  if (sourceLoading || walletLoading)
    return (
      <View className="flex-1 mt-20">
        <Loader />
      </View>
    );

  return (
    <>
      <View>
        {/* sources */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-3 items-center">
            <MaterialIcons name="category" size={24} color="white" />
            <Text className="text-white text-base">Sources</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => setShowSources(true)}>
            <Text className="text-xs text-white">More</Text>
          </TouchableWithoutFeedback>
        </View>
        <View className="mt-5 flex-row">
          <>
            {remSources.length ? (
              <>
                <ActiveButton
                  _id={selectedSource?._id}
                  active_Id={selectedSource?._id}
                  onPress={() => onSourceUpdate(selectedSource)}
                  value={selectedSource?.name}
                />

                {remSources.slice(0, 2).map((source) => (
                  <ActiveButton
                    key={source._id}
                    _id={source._id}
                    active_Id={selectedSource._id}
                    onPress={() => onSourceUpdate(source)}
                    value={source.name}
                  />
                ))}
              </>
            ) : (
              <>
                <Text className="text-white font-bold text-center">
                  No Source Found, Please Add A Source First
                </Text>
              </>
            )}
          </>
          <Modal animationType="slide" visible={showSources}>
            <View className="bg-bg-dark flex-1 px-6 py-5">
              <CloseModal onCloseModal={() => setShowSources(false)} />
              <Text className="text-white bold text-lg mt-5">
                Select Any Source
              </Text>

              <ScrollView className=" mt-5">
                <View style={{ gap: 20 }} className="flex-row flex-wrap">
                  {sources.map((source) => (
                    <TouchableWithoutFeedback
                      key={source._id}
                      onPress={() => {
                        onSourceUpdate(source);
                        setShowSources(false);
                      }}
                    >
                      <View
                        className="flex-row items-center border border-white py-2 px-3 rounded-lg"
                        style={{ gap: 20, width: (width - 48 - 20) / 2 }}
                      >
                        {getIcon({ name: source.icon.name })[source.icon.group]}
                        <Text className="text-white font-semibold">
                          {source.name}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
        {/* wallets */}
        <View className="flex-row items-center justify-between mt-6">
          <View className="flex-row gap-3 items-center">
            <FontAwesome5 name="wallet" size={24} color="white" />
            <Text className="text-white text-base">Wallets</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => setShowWallets(true)}>
            <Text className="text-xs text-white">More</Text>
          </TouchableWithoutFeedback>
        </View>
        <View className="mt-5 flex-row">
          <>
            {remSources.length ? (
              <>
                <ActiveButton
                  _id={selectedWallet?._id}
                  active_Id={selectedWallet?._id}
                  onPress={() => onWalletUpdate(selectedWallet)}
                  value={selectedWallet?.name}
                />

                {remWallets.slice(0, 2).map((wallet) => (
                  <ActiveButton
                    key={wallet._id}
                    _id={wallet._id}
                    active_Id={selectedWallet._id}
                    onPress={() => onWalletUpdate(wallet)}
                    value={wallet.name}
                  />
                ))}
              </>
            ) : (
              <>
                <Text className="text-white font-bold text-center">
                  No Source Found, Please Add A Source First
                </Text>
              </>
            )}
          </>
          <Modal animationType="slide" visible={showWallets}>
            <View className="bg-bg-dark flex-1 px-6 py-5">
              <CloseModal onCloseModal={() => setShowWallets(false)} />
              <Text className="text-white bold text-lg mt-5">
                Select Any Wallets
              </Text>

              <ScrollView className=" mt-5">
                <View style={{ gap: 20 }} className="flex-row flex-wrap">
                  {wallets.map((wallet) => (
                    <TouchableWithoutFeedback
                      key={wallet._id}
                      onPress={() => {
                        onWalletUpdate(wallet);
                        setShowWallets(false);
                      }}
                    >
                      <View
                        className="flex-row items-center border border-white py-2 px-3 rounded-lg"
                        style={{ gap: 20, width: (width - 48 - 20) / 2 }}
                      >
                        {getIcon({ name: wallet.icon.name })[wallet.icon.group]}
                        <Text className="text-white font-semibold">
                          {wallet.name}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
        <Button customClass="mt-6">
          <Text className="text-white">Add Transaction</Text>
        </Button>
      </View>
    </>
  );
}
