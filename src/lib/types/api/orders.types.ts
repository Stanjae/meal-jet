import type { ICheckoutSummaryResponse } from '../store.types';
import type { TPostApiResponse } from './auth.types';

export type THandleCheckoutResponse = TPostApiResponse<ICheckoutSummaryResponse>;
