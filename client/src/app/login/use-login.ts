import { useInput } from '@/hooks/use-input';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AUTH } from '@/utils/firebase.config';
import { toast } from '@/utils/helpers/toast.helper';
import { fetchHelper } from '@/utils/helpers/fetch.helper';
import { TLoginPayload } from '@/utils/types/server.types';
import { setToken } from '@/utils/helpers/token.helper';
import { router } from 'expo-router';
import { useMetaServices } from '@/store/use-meta-services';
import { useSourceServices } from '@/store/use-source-services';
import { useTransactionServices } from '@/store/use-transaction-services';
import { useTransferServices } from '@/store/use-transfer-services';
import { useWalletsServices } from '@/store/use-wallets-services';

export const useLogin = () => {
  const [email, onEmailChange, setEmailError] = useInput();
  const [password, onPasswordChange, setPasswordError] = useInput();
  const [loading, setLoading] = useState(false);
  const { enableRefetch: enableMetaRefetch } = useMetaServices();
  const { refetch: sourceRefetch } = useSourceServices();
  const { enableRefetch: enableTransactionRefetch } = useTransactionServices();
  const { enableRefetch: enableTransferRefetch } = useTransferServices();
  const { refetch: walletRefetch } = useWalletsServices();

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) return setEmailError('Invalid Email');
    if (!password.value) return setPasswordError('Password is required');
    if (password.value.length < 6) return setPasswordError('Min Length is 6');

    try {
      setLoading(true);
      await signInWithEmailAndPassword(AUTH, email.value, password.value);

      const response = await fetchHelper<{ token: string }, TLoginPayload>({
        url: 'auth/login',
        method: 'POST',
        body: { email: email.value, password: password.value },
      });

      if (!response.ok) throw new Error(response.message);

      toast.success(response.message);
      setToken(response.data?.token!);

      enableMetaRefetch();
      sourceRefetch();
      enableTransactionRefetch();
      enableTransferRefetch();
      walletRefetch();
      router.replace('/');
    } catch (err: any) {
      console.log(err);
      toast.error('Error Occurred!', err.message || 'something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    states: { email, password, loading },
    handlers: { handleLogin, onEmailChange, onPasswordChange },
  };
};
