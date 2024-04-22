import { Input } from '@/components/shared/input/input';
import { CloseModal } from '@/components/ui/close-modal';
import { Modal, ScrollView, Text, View } from 'react-native';
import { useAddWallet } from './use-add-wallet';
import { CheckBox } from '@/components/shared/input/check-box';
import { Button } from '@/components/ui/button';
import { AntDesign } from '@expo/vector-icons';
import { IconPicker } from '@/components/shared/icon/icon-picker';
import { Loader } from '@/components/ui/loader';

type AddWalletProps = {
  showWalletModal: boolean;
  onCloseWalletModal: () => void;
};

export function AddWallet({
  showWalletModal,
  onCloseWalletModal,
}: AddWalletProps) {
  const { states, handles } = useAddWallet({ onCloseWalletModal });
  const { name, balance, isSavingWallet, icon, isLoading } = states;
  const {
    onNameChange,
    onBalanceChange,
    handleSavingWalletToggle,
    updateIcon,
    onAddWallet,
  } = handles;

  return (
    <Modal className="flex-1" animationType="slide" visible={showWalletModal}>
      <View className="bg-bg-dark flex-1 pt-4 px-6">
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <CloseModal onCloseModal={onCloseWalletModal} />
          <Text className="text-white text-lg mt-8 mb-6 text-center">
            Set Wallet Icon
          </Text>
          <IconPicker icon={icon} updateIcon={updateIcon} />
          <View style={{ gap: 16 }} className="mt-12">
            <Input
              placeholder="Name"
              value={name.value}
              onValueChange={onNameChange}
              error={name.error}
            />
            <Input
              placeholder="Balance"
              value={balance.value}
              onValueChange={onBalanceChange}
              keyboardType="decimal-pad"
              error={balance.error}
            />
            <CheckBox
              customClass="ml-4"
              placeholder="Saving Wallet"
              isSelected={isSavingWallet}
              onToggle={handleSavingWalletToggle}
            />
            <View className="items-center mt-4">
              {isLoading ? (
                <Loader />
              ) : (
                <Button onPress={onAddWallet} customClass="flex-row">
                  <Text className="text-xl font-bold text-white mr-2">Add</Text>
                  <AntDesign name="plus" size={24} color="white" />
                </Button>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
