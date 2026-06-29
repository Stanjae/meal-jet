import type { riderStatus } from '@/lib/constants';
import { type TCreateRiderResponse, type TGetApiResponse } from '@/lib/types';
import Client from '../axiosInstance';
import { ENDPOINTS } from './endpoints';

const riderClient = {
  /**
   * Description - create rider profile for newly registered riders.
   * @param { FormData} payload - The rider's profile information.
   * @returns Data fetched from `/rider/create-rider`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  createRider: async (payload: FormData) => {
    return await Client.post<TCreateRiderResponse>(ENDPOINTS.createRider, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Description - check if the rider's profile has been approved by the admin.
   * @returns Data fetched from `/rider/is-rider-approved`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  checkRiderApprovalStatus: async () => {
    return await Client.get<TGetApiResponse<{ status: (typeof riderStatus)[number] | null }>>(
      ENDPOINTS.checkRiderApprovalStatus
    );
  },
};

export default riderClient;
