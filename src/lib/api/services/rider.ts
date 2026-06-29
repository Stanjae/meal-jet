/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import riderClient from '../clients/rider';

export const useCreateRider = () => {
  return useMutation({
    mutationFn: riderClient.createRider,
    onSuccess: (data) => {
      notifications.show({
        message: 'Your rider profile will be approved soon.',
        color: 'green',
        title: data.message,
      });
    },
    onError: (error: any) => {
      notifications.show({
        message:
          error.response?.data?.message || 'An error occurred while creating the rider profile.',
        color: 'red',
        title: 'Error',
      });
    },
  });
};
