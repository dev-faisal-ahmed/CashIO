import { Alert, Dimensions } from 'react-native';

export const getDimension = () => {
  return Dimensions.get('window');
};

export const alert = (title: string, message: string) => {
  Alert.alert(title, message, [{ text: 'OK' }], { userInterfaceStyle: 'dark' });
};
