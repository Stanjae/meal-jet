import { type StateCreator } from 'zustand';
import type { IUser } from '../types';

const initialState = { user: null as IUser | null };

export type MealJetAuth = typeof initialState & {
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
};

export const createAuthSlice: StateCreator<MealJetAuth, [], [], MealJetAuth> = (set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null })),
});
