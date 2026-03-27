/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { notifications } from '@mantine/notifications';
import { ENDPOINTS } from '../clients';
import vendorClient from '../clients/vendor';

export const useCreateVendor = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: vendorClient.createVendor,
    onSuccess: (data) => {
      notifications.show({
        message: 'Your vendor profile will be approved soon.',
        color: 'green',
        title: data.message,
      });
      navigate({ to: '/dashboard/select-store' });
    },
    onError: (error: any) => {
      console.error('Error creating vendor:', error);
      notifications.show({
        message:
          error.response?.data?.message || 'An error occurred while creating the vendor profile.',
        color: 'red',
        title: 'Error',
      });
    },
  });
};

export const useGetVendorProfiles = () => {
  return useQuery({
    queryKey: [ENDPOINTS.getVendorProfiles],
    queryFn: vendorClient.getVendorProfiles,
  });
};
