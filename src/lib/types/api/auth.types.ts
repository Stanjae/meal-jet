import type { IUser } from '../store.types';

export type TGetApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    data: T;
    meta: {
      page: number;
      limit: number;
      totalRecords: number;
      previousPage: boolean;
      nextPage: boolean;
      pageCount: number;
    };
  };
  path: string;
  duration: number;
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
