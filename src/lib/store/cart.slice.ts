import { type StateCreator } from 'zustand';
import type { MJAddToCartItem } from '../types';

const initialState = { cart: new Map<string, MJAddToCartItem>() };

/* const toMap = (cart: unknown): Map<string, MJAddToCartItem> => {
  if (cart instanceof Map) return cart;
  if (Array.isArray(cart)) return new Map(cart);
  if (cart && typeof cart === 'object') return new Map(Object.entries(cart));
  return new Map();
}; */

export type MealJetCart = typeof initialState & {
  addToCart: (id: string, product: MJAddToCartItem) => void;
  updateQuantity: (id: string, value: number) => void;
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
});
