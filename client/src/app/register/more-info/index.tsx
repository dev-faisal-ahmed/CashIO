import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useMoreInfo } from './_hooks/use-more-info';
import { Input } from '@/components/shared/input/input';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { getDimension } from '@/utils/helper';
import { Fontisto } from '@expo/vector-icons';
import { Loader } from '@/components/ui/loader';

const { width } = getDimension();
const options = ['BDT', 'DOLLAR', 'EURO', 'INR'];

export default function MoreInfo() {
  const { state, handlers } = useMoreInfo();
  const { name, currency, openModal, isLoading } = state;
  const { onNameChange, setOpenModal, onCurrencySelection, onProfileUpdate } =
    handlers;

  return (
    <View className="px-6 flex-1 relative bg-bg-dark">
      <StatusBar style="light" />

      <KeyboardAvoidingView behavior="height" className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text className="text-3xl font-bold text-primary-500 mb-2">
            One More Moment
          </Text>
          <Text className="text-neutral-400 mb-8">
            Please Provide us some crucial information
          </Text>
          <View style={{ gap: 16 }}>
            <Input
              value={name.value}
              onValueChange={onNameChange}
              placeholder="Name"
              error={name.error}
            />
            <TouchableOpacity
              onPress={() => setOpenModal(true)}
              style={{ width: width * 0.85 }}
              className="px-8 py-4 rounded-full text-white bg-card-bg-dark"
            >
              <Text className="text-white text-lg">
                {currency.value ? currency.value : 'Currency'}
              </Text>
            </TouchableOpacity>
            {currency.error && (
              <Text className="text-error-500 ml-8 -mt-2">
                {currency.error}
              </Text>
            )}
            {isLoading ? (
              <Loader />
            ) : (
              <Button onPress={onProfileUpdate} customClass="mt-4">
                <Text className="text-xl font-bold text-white">Update</Text>
              </Button>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* bottom sheets */}
      <BottomSheet isOpen={openModal} close={() => setOpenModal(false)}>
        <View className="space-y-3">
          {options.map((option) => (
            <TouchableOpacity
              onPress={() => onCurrencySelection(option)}
              style={{ gap: 10 }}
              className="flex-row items-center"
              key={option}
            >
              {option === currency.value ? (
                <Fontisto name="radio-btn-active" size={16} color="white" />
              ) : (
                <Fontisto name="radio-btn-passive" size={16} color="white" />
              )}
              <Text className="text-white text-base">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </View>
  );
}
