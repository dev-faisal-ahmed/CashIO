import { useTransferServices } from '@/store/use-transfer-services';
import { useEffect } from 'react';
import { View } from 'react-native';

export function Transfers() {
  const { transfers, fetch, loading } = useTransferServices();

  useEffect(() => {
    fetch();
  }, []);

  return <View></View>;
}
