import { View } from 'react-native';
import { getDimension } from '@/utils/helpers/ui.helper';
import { ScreenHeader } from '@/components/shared/screen-header/screen-header';
import { useGetAuth } from '@/hooks/use-get-auth';
import { useMetaServices } from '@/store/use-meta-services';
import { useEffect } from 'react';
import { BalanceCard } from './_component/balance-card';

const { height } = getDimension();

export default function Home() {
  const { auth } = useGetAuth();
  const { metaData, fetch } = useMetaServices();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <View style={{ height: height - 135, position: 'relative' }}>
      <ScreenHeader auth={auth!} />
      <BalanceCard
        income={metaData?.userInfo.income || 0}
        expense={metaData?.userInfo.expense || 0}
      />
    </View>
  );
}
