import { ScreenHeader } from '@/components/shared/screen-header/screen-header';
import { useGetAuth } from '@/hooks/use-get-auth';
import { getDimension } from '@/utils/helpers/ui.helper';
import { Text, View } from 'react-native';

const { height } = getDimension();

export default function Trade() {
  const { auth } = useGetAuth();

  return (
    <View style={{ height: height - 135, position: 'relative' }}>
      <ScreenHeader auth={auth!} />
    </View>
  );
}
