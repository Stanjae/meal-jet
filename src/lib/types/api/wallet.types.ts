import type { TPostApiResponse } from './auth.types';

export type TCreateWalletResponse = TPostApiResponse<{
  status: 'success';
}>;

export type TCreateWalletPayload = {
  userId: string;
};
