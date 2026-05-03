import type {
  MJAddToCartItem,
  TGetOrderDetailsResponse,
  THandleCheckoutResponse,
} from '@/lib/types';
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

  /**
   * Description - fetches order details for a given checkout session after successful payment
   * @param {string} checkoutId - ID of the checkout session to fetch details for.
   * @returns order details for the given checkout session
   * @throws {Error} If the request fails.
   */
  getOrderDetails: async (checkoutId: string) => {
    return await Client.get<TGetOrderDetailsResponse>(`${ENDPOINTS.getOrderDetails}/${checkoutId}`);
  },
};

export default ordersClient;
