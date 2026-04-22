import type { TPostApiResponse } from './auth.types';

export type TPaymentMenthod = 'wallet' | 'card' | 'paystack' | 'ussd';

export type TInitializePaymentPayload = {
  checkoutSessionId: string;
  paymentMethod: TPaymentMenthod;
  noteForRider?: string;
  noteForVendor?: string;
};

export type TInitializePaymentRes = {
  paymentUrl: string;
  checkoutSessionId: string;
  paymentMethod: TPaymentMenthod;
  accessCode?: string;
};

export type TInitializePaymentResponse = TPostApiResponse<TInitializePaymentRes>;
