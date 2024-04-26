import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useAddTrade } from './use-add-trade';
import { Input } from '@/components/shared/input/input';
import { TradeTypeButton } from './_component/trade-type-button';
import { getDimension } from '@/utils/helpers/ui.helper';
import {
  DatePicker,
  DatePickerProvider,
  DayPicker,
  MonthPicker,
  YearPicker,
} from '@/components/shared/date-picker/date-picker';

export default function AddTrade() {
  const { states, handlers } = useAddTrade();
  const { amount, selectedTradeType } = states;
  const { onAmountChange, onSelectedTradeTypeChange } = handlers;

  return (
    <DatePickerProvider>
      <ScrollView style={{ position: 'relative' }}>
        <Text className="text-white text-center text-lg font-bold mt-2 mb-6">
          Add New Trade
        </Text>
        <Input
          placeholder="Amount"
          value={amount.value}
          onValueChange={onAmountChange}
          keyboardType="decimal-pad"
          error={amount.error}
        />
        <TradeTypeButton
          selectedType={selectedTradeType}
          onSelectedTypeChanges={onSelectedTradeTypeChange}
        />
        <DatePicker />
      </ScrollView>

      <DayPicker />
      <MonthPicker />
      <YearPicker />
    </DatePickerProvider>
  );
}
