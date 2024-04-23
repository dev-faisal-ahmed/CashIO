import { Input } from '@/components/shared/input/input';
import { CloseModal } from '@/components/ui/close-modal';
import { Modal, Text, View } from 'react-native';
import { CheckBox } from '@/components/shared/input/check-box';
import { Button } from '@/components/ui/button';
import { AntDesign } from '@expo/vector-icons';
import { IconPicker } from '@/components/shared/icon/icon-picker';
import { Loader } from '@/components/ui/loader';
import { useAddSource } from './use-add-source';
import { useKeyboard } from '@/hooks/use-keyboard';
import { twMerge } from 'tailwind-merge';

type AddSourceProps = {
  showModal: boolean;
  onCloseModal: () => void;
};

export function AddSource({ showModal, onCloseModal }: AddSourceProps) {
  const { keyboardShown } = useKeyboard();
  const { states, handlers } = useAddSource({ onCloseModal });
  const { icon, name, isBudgetEnabled, budget, loading } = states;
  const {
    updateIcon,
    onNameChange,
    budgetToggle,
    onBudgetChange,
    onAddSource,
  } = handlers;

  return (
    <Modal className="flex-1" animationType="slide" visible={showModal}>
      <View className="bg-bg-dark flex-1 pt-4 px-6">
        <CloseModal onCloseModal={onCloseModal} />
        <Text
          className={twMerge(
            'text-white text-lg mt-8 mb-6 text-center',
            keyboardShown ? '-mt-6' : ''
          )}
        >
          Set Source Icon
        </Text>
        <IconPicker icon={icon} updateIcon={updateIcon} />
        <View style={{ gap: 16 }} className="mt-12">
          <Input
            placeholder="Name"
            value={name.value}
            onValueChange={onNameChange}
            error={name.error}
          />
          <CheckBox
            customClass="ml-4"
            placeholder="Set Budget"
            isSelected={isBudgetEnabled}
            onToggle={budgetToggle}
          />
          <Text className="text-white text-lg ml-4 mt-2">Set Budget</Text>
          <Input
            placeholder="Budget"
            value={budget.value}
            onValueChange={onBudgetChange}
            keyboardType="decimal-pad"
            error={budget.error}
          />
          <View className="items-center mt-4">
            {loading ? (
              <Loader />
            ) : (
              <Button
                onPress={onAddSource}
                customClass="flex-row min-w-[160px] justify-center"
              >
                <Text className="text-xl font-bold text-white mr-2">Add</Text>
                <AntDesign name="plus" size={24} color="white" />
              </Button>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
