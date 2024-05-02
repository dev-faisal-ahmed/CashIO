import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { CloseModal } from '@/components/ui/close-modal';
import { getIcon } from '@/components/shared/icon/icon-helper';
import { getDimension } from '@/utils/helpers/ui.helper';
import { TWallet } from '@/utils/types/data.types';
import { ActiveButton } from './active-button';

type WalletsProps = {
  showWallets: boolean;
  setShowWallets: Dispatch<SetStateAction<boolean>>;
  wallets: TWallet[];
  selectedWallet: TWallet;
  onWalletUpdate: (wallet: TWallet) => void;
};

const { width } = getDimension();

export function WalletsPicker({
  showWallets,
  setShowWallets,
  wallets,
  selectedWallet,
  onWalletUpdate,
}: WalletsProps) {
  const remWallets = useMemo(() => {
    return wallets.filter((wallet) => wallet._id !== selectedWallet._id);
  }, [wallets, selectedWallet]);

  return (
    <>
      <View className="flex-row items-center justify-between mt-6">
        <View className="flex-row gap-3 items-center">
          <FontAwesome5 name="wallet" size={24} color="white" />
          <Text className="text-white text-base">Wallets</Text>
        </View>
        <TouchableOpacity onPress={() => setShowWallets(true)}>
          <Text className="text-xs text-white">More</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5 flex-row">
        <>
          {remWallets.length ? (
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
                  <TouchableOpacity
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
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </>
  );
}
