import { ScreenHeader } from '@/components/shared/screen-header/screen-header';
import { useGetAuth } from '@/hooks/use-get-auth';
import { getDimension } from '@/utils/helpers/ui.helper';
import { useState } from 'react';
import { TradeButton } from './_components/trade-button';
import { TTradeButton } from '@/utils/types/data.types';
import { Transactions } from './_components/transactions/transactions';
import { View } from 'react-native';
import { Transfers } from './_components/transfers/transfers';

const { height } = getDimension();

export default function Trade() {
  const { auth } = useGetAuth();
  const [selectedType, setSelectedType] = useState<TTradeButton>('TRANSACTION');

  return (
    <View style={{ height: height - 135, position: 'relative' }}>
      <ScreenHeader auth={auth!} />
      <View className="mt-6 flex-row justify-center border border-primary-500 rounded-lg overflow-hidden">
        <TradeButton
          active={selectedType}
          onChange={() => setSelectedType('TRANSACTION')}
          value="TRANSACTION"
          index={0}
        />
        <TradeButton
          active={selectedType}
          onChange={() => setSelectedType('TRANSFER')}
          value="TRANSFER"
          index={1}
        />
      </View>

      {selectedType === 'TRANSACTION' && <Transactions />}
      {selectedType === 'TRANSFER' && <Transfers />}
    </View>
  );
}
