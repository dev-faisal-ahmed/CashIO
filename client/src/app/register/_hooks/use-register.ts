import { useInput } from '@/hooks/use-input';

export const useRegister = () => {
  const [password, onPasswordChange, setPasswordError] = useInput();
  const [email, onEmailChange, setEmailError] = useInput();
  const [confirmPassword, onConfirmPasswordChange, setConfirmPasswordError] =
    useInput();

  const validateInput = () => {
    // clearing all error
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    // validating inputs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) return setEmailError('Invalid Email');
    if (!password.value) return setPasswordError('Password is required');
    if (!confirmPassword.value)
      return setConfirmPasswordError('Confirm Password is required');
    if (password.value !== confirmPassword.value)
      return setConfirmPasswordError(
        'Password and confirm password does not match'
      );

    return true;
  };

  const handleRegister = () => {
    const isValidated = validateInput();
    if (!isValidated) return;
  };

  return {
    states: { password, email, confirmPassword },
    handlers: {
      onPasswordChange,
      onEmailChange,
      onConfirmPasswordChange,
      handleRegister,
    },
  };
};
