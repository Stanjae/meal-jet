import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
