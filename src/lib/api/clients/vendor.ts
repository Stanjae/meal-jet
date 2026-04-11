import type {
  TCreateVendorResponse,
  TGetProfileCountResponse,
  TGetVendorProfileResponse,
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

  /**
   * Description - get all vendor profiles (for customers to explore).
   * @returns Data fetched from `/vendor/get-all-vendors`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  getAllVendors: async () => {
    return await Client.get<TGetVendorProfilesResponse>(ENDPOINTS.getAllVendors);
  },

  /**
   * Description - get a single vendor profile (for customers to view vendor details).
   * @param {string} vendorId - The ID of the vendor to fetch.
   * @returns Data fetched from `/vendor/get-vendor-profile/${vendorId}`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  getVendorProfile: async (vendorId: string) => {
    return await Client.get<TGetVendorProfileResponse>(`${ENDPOINTS.getVendorProfile}/${vendorId}`);
  },
};

export default vendorClient;
