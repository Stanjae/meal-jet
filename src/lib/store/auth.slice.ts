import { type StateCreator } from 'zustand';
import type { IUser } from '../types';

const initialState = { user: null as IUser | null };

export type MealJetAuth = typeof initialState & {
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
  updateUser: (user: Partial<IUser>) => void;
};

export const createAuthSlice: StateCreator<MealJetAuth, [], [], MealJetAuth> = (set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null })),
  updateUser: (userUpdates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userUpdates } : null,
    })),
});
