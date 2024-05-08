import { IconPicker } from '@/components/shared/icon/icon-picker';
import { Modal, ScrollView, Text, View } from 'react-native';
import { TIcon } from '@/components/shared/icon/icon-helper';
import { Input } from '@/components/shared/input/input';
import { CloseModal } from '@/components/ui/close-modal';
import { useEditSource } from './use-edit-source';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';

type EditSourceProps = {
  previousName: string;
  previousBudget: number;
  icon: TIcon;
  showModal: boolean;
  onCloseModal: () => void;
  sourceId: string;
};

export function EditSource({
  previousName,
  previousBudget,
  icon,
  showModal,
  onCloseModal,
  sourceId,
}: EditSourceProps) {
  const {
    form: {
      fields: { name, budget },
      handlers: { onNameChange, onBudgetChange },
    },
    states: { selectedIcon, loading },
    handlers: { onIconUpdate, onEditSource },
  } = useEditSource({
    previousName,
    previousBudget,
    icon,
    onCloseModal,
    sourceId,
  });

  return (
    <Modal className="flex-1" animationType="slide" visible={showModal}>
      <View className="bg-bg-dark flex-1 pt-4 px-6">
        <ScrollView>
          <CloseModal onCloseModal={onCloseModal} />
          <Text className="text-white text-lg mt-8 mb-6 text-center">
            Set Wallet Icon
          </Text>
          <IconPicker icon={selectedIcon} updateIcon={onIconUpdate} />
          <View style={{ gap: 24 }} className="mt-12">
            <Input
              placeholder="Name"
              value={name.value}
              onValueChange={onNameChange}
              error={name.error}
            />

            <Input
              placeholder="Budget"
              value={budget.value}
              onValueChange={onBudgetChange}
              error={budget.error}
            />

            <View className="items-center mt-4">
              {loading ? (
                <Loader />
              ) : (
                <Button
                  onPress={onEditSource}
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
