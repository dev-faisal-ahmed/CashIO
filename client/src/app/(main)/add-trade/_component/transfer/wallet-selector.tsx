import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { TWallet } from '@/utils/types/data.types';
import { getIcon } from '@/components/shared/icon/icon-helper';
import { CloseModal } from '@/components/ui/close-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';

type WalletFromProps = {
  title: string;
  selectedWallet: TWallet | undefined;
  wallets: TWallet[];
  onWalletChange: (wallet: TWallet) => void;
  disable?: boolean;
};

export function WalletSelector({
  title,
  selectedWallet,
  wallets,
  onWalletChange,
  disable,
}: WalletFromProps) {
  const [showWallets, setShowWallets] = useState(false);

  const updateFromWallet = (wallet: TWallet) => {
    onWalletChange(wallet);
    setShowWallets(false);
  };

  return (
    <>
      <View className="flex-1">
        <View className="flex-row gap-3 items-center mb-4">
          <FontAwesome5 name="wallet" size={24} color="white" />
          <Text className="text-white text-base">{title}</Text>
        </View>
        <TouchableOpacity
          disabled={disable}
          onPress={() => setShowWallets(true)}
          className={twMerge(
            'bg-card-bg-dark p-4 rounded-xl',
            disable && 'bg-gray-500'
          )}
        >
          {selectedWallet ? (
            <View
              style={{ gap: 10 }}
              className="items-center flex-row justify-center"
            >
              {
                getIcon({ name: selectedWallet.icon.name, size: 18 })[
                  selectedWallet.icon.group
                ]
              }
              <Text numberOfLines={1} className="text-white font-bold">
                {selectedWallet.name}
              </Text>
            </View>
          ) : (
            <Text
              numberOfLines={1}
              className="text-white text-center font-bold"
            >
              Select Any Wallet
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* modal */}
      <Modal animationType="slide" visible={showWallets}>
        <View className="flex-1 bg-bg-dark px-6 py-3">
          <CloseModal onCloseModal={() => setShowWallets(false)} />
          <Text className="text-white text-center font-bold text-base">
            Select {title}
          </Text>

          {wallets.map((wallet) => (
            <TouchableOpacity
              onPress={() => updateFromWallet(wallet)}
              style={{ gap: 20 }}
              className="flex-row items-center mt-6 border-b pb-3 border-card-bg-dark px-2"
              key={wallet._id}
            >
              <View className="bg-card-bg-dark rounded-md p-2">
                {getIcon({ name: wallet.icon.name })[wallet.icon.group]}
              </View>
              <Text className="text-white font-bold text-lg">
                {wallet.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
}