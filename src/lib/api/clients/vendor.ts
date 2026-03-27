import type {
  TCreateVendorResponse,
  TGetProfileCountResponse,
  TGetVendorProfilesResponse,
} from '@/lib/types';
import Client from '../axiosInstance';
import { ENDPOINTS } from './endpoints';

const vendorClient = {
  /**
   * Description - create vendor profile for newly registered vendors.
   * @param { FormData} payload - The vendor's profile information.
   * @returns Data fetched from `/vendor/create-vendor`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  createVendor: async (payload: FormData) => {
    return await Client.post<TCreateVendorResponse>(ENDPOINTS.createVendor, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Description - get vendor profile count.
   * @returns Data fetched from `/vendor/vendor-profile-count`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  vendorProfileCount: async () => {
    return await Client.get<TGetProfileCountResponse>(`${ENDPOINTS.vendorProfileCount}`);
  },

  /**
   * Description - get vendor profiles.
   * @returns {TGetVendorProfilesResponse} - Data fetched from `/vendor/get-vendor-profiles`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  getVendorProfiles: async () => {
    return await Client.get<TGetVendorProfilesResponse>(ENDPOINTS.getVendorProfiles);
  },
};

export default vendorClient;
