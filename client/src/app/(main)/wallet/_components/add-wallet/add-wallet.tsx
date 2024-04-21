import { Input } from '@/components/shared/input/input';
import { CloseModal } from '@/components/ui/close-modal';
import { Modal, Text, View } from 'react-native';
import { useAddWallet } from './use-add-wallet';
import { CheckBox } from '@/components/shared/input/check-box';
import { Button } from '@/components/ui/button';
import { AntDesign } from '@expo/vector-icons';

type AddWalletProps = {
  showWalletModal: boolean;
  onCloseWalletModal: () => void;
};

export function AddWallet({
  showWalletModal,
  onCloseWalletModal,
}: AddWalletProps) {
  const { states, handles } = useAddWallet();
  const { name, balance, isSavingWallet } = states;
  const { onNameChange, onBalanceChange, handleSavingWalletToggle } = handles;

  return (
    <Modal animationType="slide" visible={showWalletModal}>
      <View className="bg-bg-dark flex-1 pt-4 px-6">
        <CloseModal onCloseModal={onCloseWalletModal} />
        <Text className="text-white mt-8">Set Wallet Icon</Text>
        <View></View>
        <View style={{ gap: 16 }} className="mt-4">
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
            <Button customClass="flex-row">
              <Text className="text-xl font-bold text-white mr-2">Add</Text>
              <AntDesign name="plus" size={24} color="white" />
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
