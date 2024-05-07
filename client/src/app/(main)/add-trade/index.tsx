import { AddTradeProvider } from './_component/add-trade-context';
import { AddTradeUI } from './_component/add-trade-ui';
import { DatePickerProvider } from '@/components/shared/date-picker/date-picker';

export default function AddTrade() {
  return (
    <AddTradeProvider>
      <DatePickerProvider>
        <AddTradeUI />
      </DatePickerProvider>
    </AddTradeProvider>
  );
}
