import { useState } from 'react';
import { View } from 'react-native';
import { useGetAuth } from '@/hooks/use-get-auth';
import { TTradeButton } from '@/utils/types/data.types';
import { TradeButton } from './_components/trade-button';
import { getDimension } from '@/utils/helpers/ui.helper';
import { Transfers } from './_components/transfers/transfers';
import { Transactions } from './_components/transactions/transactions';
import { ScreenHeader } from '@/components/shared/screen-header/screen-header';

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

      <View className="flex-1 mt-8">
        {selectedType === 'TRANSACTION' && <Transactions />}
        {selectedType === 'TRANSFER' && <Transfers />}
      </View>
    </View>
  );
}
