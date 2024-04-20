import { AUTH } from '@/utils/firebase.config';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState<User | null>();

  useEffect(() => {
    onAuthStateChanged(AUTH, (user) => {
      setAuth(user);
    });
  }, []);

  return { auth };
};
