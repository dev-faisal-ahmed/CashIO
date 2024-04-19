import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Dimensions } from 'react-native';

export const getDimension = () => {
  return Dimensions.get('window');
};

export const alert = (title: string, message: string) => {
  Alert.alert(title, message, [{ text: 'OK' }], { userInterfaceStyle: 'dark' });
};

export const getToken = async () => {
  const dataAsStr = await AsyncStorage.getItem('token');
  if (!dataAsStr) return null;
  return JSON.parse(dataAsStr);
};
