import { create, type ExtractState } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createAuthSlice, type MealJetAuth } from './auth.slice';
import { createCartSlice, type MealJetCart } from './cart.slice';

type MealJetStore = MealJetAuth & MealJetCart;

// Create store using the curried form of `create`
export const useMealJetStore = create<MealJetStore>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createCartSlice(...a),
    }),
    {
      name: 'mj-storage',
      storage: createJSONStorage(() => localStorage, {
        replacer: (key, value) => {
          if (value instanceof Map) {
            return { __type: 'Map', entries: [...value.entries()] };
          }
          return value;
        },
        reviver: (key, value) => {
          const newValue = value as { __type: string; entries: [string, unknown][] };
          if (newValue?.__type === 'Map') {
            return new Map(newValue.entries);
          }
          return value;
        },
      }),
      onRehydrateStorage: () => (state) => {
        if (state && !(state.cart instanceof Map)) {
          state.cart = new Map(Object.entries(state.cart));
        }
      },
    }
  )
);

export type MealJetState = ExtractState<typeof useMealJetStore>;
