import {
  DatePicker,
  DayPicker,
  MonthPicker,
  YearPicker,
} from '@/components/shared/date-picker/date-picker';
import { getDimension } from '@/utils/helpers/ui.helper';
import { AddTradeContext } from './add-trade-context';
import { useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import { Input } from '@/components/shared/input/input';
import { TradeTypeButton } from './trade-type-button';
import { AddTransaction } from './add-transaction/add-transaction';

const { height } = getDimension();

export function AddTradeUI() {
  const {
    states: { amount, selectedTradeType },
    handlers: { onAmountChange },
  } = useContext(AddTradeContext)!;
  return (
    <>
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
        <TradeTypeButton />
        <DatePicker />

        {/* add transaction */}
        {(selectedTradeType === 'INCOME' ||
          selectedTradeType === 'EXPENSE') && <AddTransaction />}
      </ScrollView>
      <DayPicker />
      <MonthPicker />
      <YearPicker />
    </>
  );
}
