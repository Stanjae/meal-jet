import type { TPostApiResponse } from './auth.types';

export type TCreateRiderResponse = TPostApiResponse<{
  message: string;
}>;
