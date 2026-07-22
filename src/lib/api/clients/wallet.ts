import type { TCreateWalletPayload, TCreateWalletResponse } from '@/lib/types';
import Client from '../axiosInstance';
import { ENDPOINTS } from './endpoints';

const walletClient = {
  /**
   * Description - create wallet for newly registered users on demand.
   * @param { TCreateWalletPayload} payload - The user's wallet information.
   * @returns Data fetched from `/wallet/create-wallet`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  createWallet: async (payload: TCreateWalletPayload) => {
    return await Client.post<TCreateWalletResponse>(ENDPOINTS.createWallet, payload);
  },
};

export default walletClient;
