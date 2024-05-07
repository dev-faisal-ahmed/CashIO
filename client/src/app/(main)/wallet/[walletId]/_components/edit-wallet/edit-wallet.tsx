import { Modal, ScrollView, Text, View } from 'react-native';
import { TIcon } from '@/components/shared/icon/icon-helper';
import { IconPicker } from '@/components/shared/icon/icon-picker';
import { CheckBox } from '@/components/shared/input/check-box';
import { Input } from '@/components/shared/input/input';
import { CloseModal } from '@/components/ui/close-modal';
import { useEditWallet } from './use-edit-wallet';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';

type EditWalletProps = {
  showModal: boolean;
  onCloseModal: () => void;
  icon: TIcon;
  previousName: string;
  saving: boolean;
  walletId: string;
};

export function EditWallet({
  showModal,
  onCloseModal,
  icon,
  previousName,
  saving,
  walletId,
}: EditWalletProps) {
  const {
    states: { selectedIcon, isSavingWallet, isLoading },
    handlers: { updateIcon, handleSavingWalletToggle, onEditWallet },
    form: {
      fields: { name },
      handlers: { onNameChange },
    },
  } = useEditWallet({ icon, onCloseModal, previousName, saving, walletId });

  return (
    <Modal className="flex-1" animationType="slide" visible={showModal}>
      <View className="bg-bg-dark flex-1 pt-4 px-6">
        <ScrollView>
          <CloseModal onCloseModal={onCloseModal} />
          <Text className="text-white text-lg mt-8 mb-6 text-center">
            Set Wallet Icon
          </Text>
          <IconPicker icon={selectedIcon} updateIcon={updateIcon} />
          <View style={{ gap: 24 }} className="mt-12">
            <Input
              placeholder="Name"
              value={name.value}
              onValueChange={onNameChange}
              error={name.error}
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
                <Button
                  onPress={onEditWallet}
                  customClass="flex-row min-w-[160px] justify-center"
                >
                  <Text className="text-xl font-bold text-white mr-2">Add</Text>
                </Button>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
