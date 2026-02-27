import { useMutation, useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../clients';
import authClient from '../clients/auth';

export const useCreateCustomerSignup = () => {
  return useMutation({ mutationFn: authClient.createCustomer });
};

export const useLogin = () => {
  return useMutation({ mutationFn: authClient.login });
};

export const useVerifyEmail = (token: string) => {
  return useQuery({
    queryKey: [ENDPOINTS.verifyEmail, token],
    queryFn: () => authClient.verifyEmail(token),
  });
};

export const useLogout = () => {
  return useMutation({ mutationFn: authClient.logout });
};
