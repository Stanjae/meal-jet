import type { IAddress, IUser, TPostApiResponse } from '@/lib/types';
import {
  type TIsAuthenticatedApiResponse,
  type TPostCustomerSignupResponse,
  type TPostUserLoginResponse,
  type TPostUserLogoutResponse,
} from '@/lib/types/api/auth.types';
import type { LoginFormData, SignupFormData } from '@/lib/utils/schema';
import Client from '../axiosInstance';
import { ENDPOINTS } from './endpoints';

const authClient = {
  /**
   * Description - create customer accounts with specified filters and sorting options.
   * @param {string} payload.username - customer username.
   * @param {string} payload.email- customer email address
   * @param {string} payload.password - custommer password
   * @param {string} payload.role - customer role (e.g., "customer", "driver", "restaurant", "admin")
   * @returns Data fetched from `/auth/customer-signup`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  createCustomer: async (payload: SignupFormData) => {
    return await Client.post<TPostCustomerSignupResponse>(ENDPOINTS.customerSignUp, payload);
  },

  /**
   * Description - verify customer email using the provided token.
   * @param {string} token - The email verification token received by the customer.
   * @returns Data fetched from `/auth/verify-email`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  verifyEmail: async (token: string) => {
    return await Client.get<{ data: { message: string; isVerified: boolean; title: string } }>(
      `${ENDPOINTS.verifyEmail}?token=${token}`
    );
  },

  /**
   * Description - log in a user with email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns Data fetched from `/auth/login`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  login: async (payload: LoginFormData) => {
    return await Client.post<TPostUserLoginResponse>(ENDPOINTS.login, payload);
  },

  /**
   * Description - log out the current user by invalidating their refresh token.
   * @returns Data fetched from `/auth/logout`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  logout: async () => {
    return await Client.post<TPostUserLogoutResponse>(ENDPOINTS.logout, {});
  },

  /**
   * Description - verify email immediately after login if the user's email is not verified.
   * @returns Data fetched from `/auth/verify-now`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  verifyNow: async (email: string) => {
    return await Client.get<{ message: string; statusCode: number }>(
      `${ENDPOINTS.verifyNow}?email=${email}`
    );
  },

  /**
   * Description - check if the user is authenticated.
   * @returns Data fetched from `/auth/is-authenticated`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */

  isAuthenticated: async () => {
    return await Client.get<TIsAuthenticatedApiResponse>(ENDPOINTS.isAuthenticated);
  },

  /**
   * Description - update the user's profile information.
   * @param {Partial<IUser>} payload - The updated user profile data.
   * @returns Data fetched from `/auth/update-user-profile`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  updateUserProfile: async ({ type, ...payload }: Partial<IUser> & { type?: string }) => {
    return await Client.patch<TPostApiResponse<{ message: string; user: IUser }>>(
      ENDPOINTS.updateUserProfile,
      payload,
      {
        params: { type },
      }
    );
  },

  /**
   * Description - delete the user's saved addresses.
   * @returns Data fetched from `/auth/delete-user-address`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  deleteUserAddress: async (addressId: string) => {
    return await Client.delete<TPostApiResponse<{ message: string; user: IUser }>>(
      `${ENDPOINTS.deleteUserAddress}/${addressId}`
    );
  },

  /**
   * Description - update the user's current address and co-ordinates.
   * @param {object} payload - The updated address data.
   * @returns Data fetched from `/auth/update-user-current-address`, or an error if the API call fails.
   * @throws {Error} If the request fails.
   */
  updateUserCurrentAddress: async (payload: IAddress) => {
    return await Client.patch<TPostApiResponse<{ message: string; user: IUser }>>(
      ENDPOINTS.updateUserCurrentAddress,
      payload
    );
  },
};

export default authClient;
