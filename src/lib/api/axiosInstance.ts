import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { useMealJetStore } from '../store/zustand.store';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Don't intercept 401s from login/signup endpoints
    if (
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/signup') ||
      originalRequest.url?.includes('/auth/register')
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch {
        useMealJetStore.getState().clearUser();
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default class Client {
  static async get<T>(url: string, options?: AxiosRequestConfig<unknown>) {
    const response = await api.get<T>(url, options);
    return response.data;
  }
  static async post<T>(url: string, data?: unknown, options?: AxiosRequestConfig<unknown>) {
    const response = await api.post<T>(url, data, options);
    return response.data;
  }
  static async put<T>(url: string, data?: unknown) {
    const response = await api.put<T>(url, data);
    return response.data;
  }
  static async patch<T>(url: string, data?: unknown, options?: AxiosRequestConfig<unknown>) {
    const response = await api.patch<T>(url, data, options);
    return response.data;
  }
  static async delete<T>(url: string, options?: AxiosRequestConfig<unknown>) {
    const response = await api.delete<T>(url, options);
    return response.data;
  }
}
