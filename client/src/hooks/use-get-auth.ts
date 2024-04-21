import { AUTH } from '@/utils/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useGetAuth = () => {
  const [auth, isLoading] = useAuthState(AUTH);
  return { auth, isLoading };
};
