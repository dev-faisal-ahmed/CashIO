import {
  DatePicker,
  DatePickerProvider,
  DayPicker,
  MonthPicker,
  YearPicker,
} from '@/components/shared/date-picker/date-picker';
import { ScrollView, Text } from 'react-native';
import { useAddTrade } from './use-add-trade';
import { Input } from '@/components/shared/input/input';
import { TradeTypeButton } from './_component/trade-type-button';
import { AddTransaction } from './_component/add-transaction/add-transaction';
import { getDimension } from '@/utils/helpers/ui.helper';

const { height } = getDimension();

export default function AddTrade() {
  const { states, handlers } = useAddTrade();
  const { amount, selectedTradeType } = states;
  const { onAmountChange, onSelectedTradeTypeChange, setAmountError } =
    handlers;

  return (
    <DatePickerProvider>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ position: 'relative', height: height - 140 }}
      >
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

        {/* add transaction */}
        {(selectedTradeType === 'INCOME' ||
          selectedTradeType === 'EXPENSE') && (
          <AddTransaction
            amount={amount.value}
            tardeType={selectedTradeType}
            setAmountError={setAmountError}
          />
        )}
      </ScrollView>
      <DayPicker />
      <MonthPicker />
      <YearPicker />
    </DatePickerProvider>
  );
}
