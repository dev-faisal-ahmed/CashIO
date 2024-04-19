import { auth } from '@/firebase.config';
import { useInput } from '@/hooks/use-input';
import { alert } from '@/utils/helper';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

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
      const user = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
    } catch (err: unknown) {
      if (err instanceof FirebaseError) return alert("Opp's", err.code);
      alert("Opp's!", 'Something went wrong');
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
