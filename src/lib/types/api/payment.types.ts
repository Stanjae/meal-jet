import type { TPostApiResponse } from './auth.types';

export type TPaymentMenthod = 'wallet' | 'card' | 'bank_transfer' | 'ussd';

export type TInitializePaymentPayload = {
  checkoutSessionId: string;
  paymentMethod: TPaymentMenthod;
};

export type TInitializePaymentRes = {
  paymentUrl: string;
  checkoutSessionId: string;
  paymentMethod: TPaymentMenthod;
};

export type TInitializePaymentResponse = TPostApiResponse<TInitializePaymentRes>;
