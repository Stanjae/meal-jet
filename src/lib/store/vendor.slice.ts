import { type StateCreator } from 'zustand';
import type { IVendor } from '../types';

const initialState = { vendor: null as IVendor | null };

export type MealJetVendor = typeof initialState & {
  setVendorProfile: (profile: IVendor) => void;
  clearVendorProfile: () => void;
};

export const createVendorSlice: StateCreator<MealJetVendor, [], [], MealJetVendor> = (set) => ({
  ...initialState,
  setVendorProfile: (profile) =>
    set(() => {
      return { vendor: profile };
    }),
  clearVendorProfile: () =>
    set(() => {
      return { vendor: null };
    }),
});
