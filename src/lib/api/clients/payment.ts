import type { TInitializePaymentPayload, TInitializePaymentResponse } from '@/lib/types';
import Client from '../axiosInstance';
import { ENDPOINTS } from './endpoints';

const paymentClient = {
  /**
   * Description - initializes payment by generating payment url from payment gateway, caches payment details in Redis (15 mins)
   * @param {TInitializePaymentPayload} payload - payload to initialize payment.
   * @returns authorization url for payment gateway to redirect user to complete payment
   * @throws {Error} If the request fails.
   */
  handleInitializePayment: async (payload: TInitializePaymentPayload) => {
    return await Client.post<TInitializePaymentResponse>(
      ENDPOINTS.initializePayment,
      JSON.stringify({ payload }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
};

export default paymentClient;
