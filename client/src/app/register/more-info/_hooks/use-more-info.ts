import { useInput } from '@/hooks/use-input';
import { auth } from '@/utils/firebase.config';
import { alert } from '@/utils/helper';
import { FirebaseError } from 'firebase/app';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';

export const useMoreInfo = () => {
  const [name, onNameChange, setNameError] = useInput();
  const [currency, onCurrencyChange, setCurrencyError] = useInput();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      const updatedUser = await updateProfile(auth.currentUser, {
        displayName: name.value,
      });
    } catch (err: any) {
      alert('Error Occurred!', err.message);
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
    },
  };
};
