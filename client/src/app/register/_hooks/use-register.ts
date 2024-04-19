import { useInput } from '@/hooks/use-input';

export const useRegister = () => {
  const [password, onPasswordChange] = useInput();
  const [email, onEmailChange] = useInput();
  const [confirmPassword, onConfirmPasswordChange] = useInput();

  const handleRegister = () => {
    console.log(email, password);
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
