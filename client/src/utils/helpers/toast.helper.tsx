import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from 'react-native-toast-message';
import { getDimension } from './ui.helper';
import { colors } from '@/themes/colors';

const { width } = getDimension();

export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: colors.card.bg.dark }}
      text1Style={{ color: 'white' }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: colors.card.bg.dark, width: width * 0.9 }}
      text1Style={{ color: colors.error[600] }}
    />
  ),
};

export const toast = {
  success: (...params: string[]) => {
    const [title, value] = params;
    Toast.show({ type: 'success', text1: title, text2: value });
  },

  error: (...params: string[]) => {
    const [title, value] = params;
    Toast.show({ type: 'success', text1: title, text2: value });
  },
};
