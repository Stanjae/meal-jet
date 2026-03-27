import type { IUser } from '../store.types';

export type TGetApiResponseWithPagination<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type TGetApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  path: string;
};

export type TPostApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  path: string;
  duration: number;
};

export type TPostCustomerSignupResponse = TPostApiResponse<{ message: string }>;

export type TPostUserLoginResponse = TPostApiResponse<{
  user: IUser;
  accessToken: string;
  message: string;
}>;

export type TPostUserLogoutResponse = TPostApiResponse<{ message: string }>;

export type TIsAuthenticatedApiResponse = TPostApiResponse<{
  user: IUser;
  isAuthenticated: boolean;
}>;
