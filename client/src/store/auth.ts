import { User } from 'firebase/auth';
import { create } from 'zustand';

type TAuth = {
  auth: User | null | undefined;
  updateUser: (payload: User | null | undefined) => void;
};

export const useAuth = create<TAuth>((set) => ({
  auth: null,
  updateUser: (payload: User | null | undefined) =>
    set(() => ({ auth: payload })),
}));
