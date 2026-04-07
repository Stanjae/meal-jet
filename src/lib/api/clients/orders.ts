import type { MJAddToCartItem, THandleCheckoutResponse } from '@/lib/types';
import Client from '../axiosInstance';
import { ENDPOINTS } from './endpoints';

const ordersClient = {
  /**
   * Description - validate cart, calculates fees per vendor, generates checkoutSessionId, caches summary in Redis (15 mins)
   * @param {MJAddToCartItem[]} payload - Array of items to checkout.
   * @returns summary to frontend
   * @throws {Error} If the request fails.
   */
  handleCheckout: async (payload: MJAddToCartItem[]) => {
    return await Client.post<THandleCheckoutResponse>(
      ENDPOINTS.checkout,
      JSON.stringify({ payload }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
};

export default ordersClient;
