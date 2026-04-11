/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { ENDPOINTS } from '../clients';
import authClient from '../clients/auth';

export const useCreateCustomerSignup = () => {
  return useMutation({ mutationFn: authClient.createCustomer });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authClient.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.isAuthenticated] });
    },
  });
};

export const useVerifyEmail = (token: string) => {
  return useQuery({
    queryKey: [ENDPOINTS.verifyEmail, token],
    queryFn: () => authClient.verifyEmail(token),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authClient.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.isAuthenticated] });
    },
  });
};

export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: [ENDPOINTS.isAuthenticated],
    queryFn: () => authClient.isAuthenticated(),
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: authClient.updateUserProfile,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
    },
    onError: (error: any) => {
      notifications.show({
        message: error.response?.data?.message,
        color: 'red',
        title: 'Error',
      });
    },
  });
};

export const useDeleteUserAddress = () => {
  return useMutation({
    mutationFn: authClient.deleteUserAddress,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
    },
    onError: (error: any) => {
      notifications.show({
        message: error.response?.data?.message,
        color: 'red',
        title: 'Error',
      });
    },
  });
};

export const useUpdateUserCurrentAddress = () => {
  return useMutation({
    mutationFn: authClient.updateUserCurrentAddress,
    onSuccess: (data) => {
      notifications.show({
        message: data.message || data.data.message,
        color: 'green',
        title: 'Success',
      });
    },
    onError: (error: any) => {
      notifications.show({
        message: error.response?.data?.message,
        color: error?.response?.status === 409 ? 'blue' : 'red',
        title: error?.response?.status === 409 ? 'Info' : 'Error',
      });
    },
  });
};
