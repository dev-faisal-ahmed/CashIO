import { colors } from '@/themes/colors';
import { ActivityIndicator } from 'react-native';

export function Loader() {
  return <ActivityIndicator size={'large'} color={colors.primary[300]} />;
}
