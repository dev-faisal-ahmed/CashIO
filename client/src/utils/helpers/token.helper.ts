import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  const dataAsStr = await AsyncStorage.getItem('token');
  return dataAsStr;
};

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};
