import { type StateCreator } from 'zustand';
import type { ICheckoutSummaryResponse, MJAddToCartItem } from '../types';

const initialState = {
  cart: new Map<string, MJAddToCartItem>(),
  noteForVendor: '',
  noteForRider: '',
  checkoutOrderSummary: {} as ICheckoutSummaryResponse,
};

export type MealJetCart = typeof initialState & {
  addToCart: (id: string, product: MJAddToCartItem) => void;
  updateQuantity: (id: string, value: number) => void;
  clearCart: () => void;
  removeItem: (id: string) => void;
  setNoteForVendor: (note: string) => void;
  setNoteForRider: (note: string) => void;
  setCheckoutOrderSummary: (checkoutOrderSummary: ICheckoutSummaryResponse) => void;
  clearCheckoutOrderSummary: () => void;
};

export const createCartSlice: StateCreator<MealJetCart, [], [], MealJetCart> = (set) => ({
  ...initialState,
  addToCart: (id, product) =>
    set((state) => {
      const cart = new Map(state.cart);
      if (cart.has(id)) {
        cart.delete(id);
        return { cart };
      } else {
        cart.set(id, product);
        return { cart };
      }
    }),
  updateQuantity: (id, value) =>
    set((state) => {
      const cart = new Map(state.cart);
      const product = cart.get(id);
      if (product) {
        product.quantity += value;
        if (product.quantity <= 0) {
          cart.delete(id);
          return { cart };
        }
        cart.set(id, product);
      }
      return { cart };
    }),
  clearCart: () =>
    set(() => {
      return { cart: new Map() };
    }),
  removeItem: (id) =>
    set((state) => {
      const cart = new Map(state.cart);
      cart.delete(id);
      return { cart };
    }),
  setNoteForVendor: (note) =>
    set(() => {
      return { noteForVendor: note };
    }),
  setNoteForRider: (note) =>
    set(() => {
      return { noteForRider: note };
    }),
  setCheckoutOrderSummary: (summary) =>
    set(() => {
      return { checkoutOrderSummary: summary };
    }),
  clearCheckoutOrderSummary: () =>
    set(() => {
      return { checkoutOrderSummary: {} as ICheckoutSummaryResponse };
    }),
});
