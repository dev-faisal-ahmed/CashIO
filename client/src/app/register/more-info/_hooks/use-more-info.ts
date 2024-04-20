import { TUpdateProfilePayload } from '@/utils/types/server.types';
import { useInput } from '@/hooks/use-input';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { auth } from '@/utils/firebase.config';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { router } from 'expo-router';
import { toast } from '@/utils/helpers/toast.helper';
import { Keyboard } from 'react-native';

export const useMoreInfo = () => {
  const [name, onNameChange, setNameError] = useInput();
  const [currency, onCurrencyChange, setCurrencyError] = useInput();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onShowCurrencyList = () => {
    setOpenModal(true);
    Keyboard.dismiss();
  };

  const onProfileUpdate = async () => {
    // initially clearing all error
    setNameError('');
    setCurrencyError('');

    if (!name.value) return setNameError('Name is required');
    if (!currency.value) return setCurrencyError('Currency is required');

    // updating user name to the firebase
    try {
      setIsLoading(true);

      if (!auth.currentUser) throw new Error('No User Found');
      await updateProfile(auth.currentUser, {
        displayName: name.value,
      });

      // now updating users
      const response = await fetchHelper<unknown, TUpdateProfilePayload>({
        url: 'auth',
        method: 'PATCH',
        body: { name: name.value, currency: currency.value },
      });

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      router.push('/');
    } catch (err: any) {
      console.log(err);
      toast.error('Error Occurred!', err.message || 'something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onCurrencySelection = (option: string) => {
    onCurrencyChange(option);
    setOpenModal(false);
  };

  return {
    state: { name, currency, openModal, isLoading },
    handlers: {
      onNameChange,
      setOpenModal,
      onProfileUpdate,
      onCurrencySelection,
      onShowCurrencyList,
    },
  };
};
