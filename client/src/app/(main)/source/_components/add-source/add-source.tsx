import { Modal, Text, View, ScrollView } from 'react-native';
import { Input } from '@/components/shared/input/input';
import { CloseModal } from '@/components/ui/close-modal';
import { Button } from '@/components/ui/button';
import { AntDesign } from '@expo/vector-icons';
import { IconPicker } from '@/components/shared/icon/icon-picker';
import { Loader } from '@/components/ui/loader';
import { useAddSource } from './use-add-source';
import { useKeyboard } from '@/hooks/use-keyboard';
import { twMerge } from 'tailwind-merge';
import { SourceTypeButton } from './source-type-button';
import { TSourceType } from '@/utils/types/data.types';

const sourceTypes: TSourceType[] = ['EXPENSE', 'INCOME', 'BOTH'];

type AddSourceProps = {
  showModal: boolean;
  onCloseModal: () => void;
};

export function AddSource({ showModal, onCloseModal }: AddSourceProps) {
  const { keyboardShown } = useKeyboard();
  const { states, handlers } = useAddSource({ onCloseModal });
  const { icon, name, budget, loading, type } = states;
  const { updateIcon, onNameChange, onBudgetChange, onAddSource, setType } =
    handlers;

  return (
    <Modal className="flex-1" animationType="slide" visible={showModal}>
      <View className="bg-bg-dark flex-1 pt-4 px-6">
        <ScrollView showsVerticalScrollIndicator={false}>
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
          <View style={{ gap: 24 }} className="mt-12">
            <Input
              placeholder="Name"
              value={name.value}
              onValueChange={onNameChange}
              error={name.error}
            />

            <Input
              placeholder="Budget (Optional)"
              value={budget.value}
              onValueChange={onBudgetChange}
              keyboardType="decimal-pad"
              error={budget.error}
            />
            <View className="flex-row w-full border border-primary-500 rounded-2xl overflow-hidden">
              {sourceTypes.map((eachType, index) => (
                <SourceTypeButton
                  key={eachType}
                  type={eachType}
                  onTypeChange={(type) => setType(type)}
                  activeType={type}
                  index={index}
                />
              ))}
            </View>

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
        </ScrollView>
      </View>
    </Modal>
  );
}
