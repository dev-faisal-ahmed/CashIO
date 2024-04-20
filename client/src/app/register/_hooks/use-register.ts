import { auth } from '@/utils/firebase.config';
import { useInput } from '@/hooks/use-input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TRegisterPayload } from '@/utils/types/server.types';
import { setToken } from '@/utils/helpers/token.helper';
import { router } from 'expo-router';
import { toast } from '@/utils/helpers/toast.helper';

export const useRegister = () => {
  const [email, onEmailChange, setEmailError] = useInput();
  const [password, onPasswordChange, setPasswordError] = useInput();
  const [confirmPassword, onConfirmPasswordChange, setConfirmPasswordError] =
    useInput();

  const [isLoading, setIsLoading] = useState(false);

  const validateInput = () => {
    // clearing all error
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    // validating inputs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) return setEmailError('Invalid Email');
    if (!password.value) return setPasswordError('Password is required');
    if (password.value.length < 6) return setPasswordError('Min Length is 6');
    if (confirmPassword.value.length < 6)
      return setPasswordError('Min Length is 6');
    if (!confirmPassword.value)
      return setConfirmPasswordError('Confirm Password is required');
    if (password.value !== confirmPassword.value)
      return setConfirmPasswordError(
        'Password and confirm password does not match'
      );

    return true;
  };

  const handleRegister = async () => {
    const isValidated = validateInput();
    if (!isValidated) return;
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email.value, password.value);

      // now creating and entry for user in the database
      const response = await fetchHelper<{ token: string }, TRegisterPayload>({
        url: 'auth/register',
        method: 'POST',
        body: { email: email.value },
      });

      if (!response.ok) throw new Error(response.message);

      setToken(response.data?.token as string);
      toast.success(response.message);
      router.push('/register/more-info');
    } catch (err: any) {
      console.log(err);
      toast.error('Error Occurred!', err.message || 'something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    states: { email, password, confirmPassword, isLoading },
    handlers: {
      onEmailChange,
      onPasswordChange,
      onConfirmPasswordChange,
      handleRegister,
    },
  };
};
