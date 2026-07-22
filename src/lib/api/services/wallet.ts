/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import walletClient from '../clients/wallet';

export const useCreateWallet = () => {
  return useMutation({
    mutationFn: walletClient.createWallet,
    onSuccess: (data) => {
      notifications.show({
        message: 'Your wallet has been created successfully.',
        color: 'green',
        title: data.message,
      });
    },
    onError: (error: any) => {
      notifications.show({
        message: error.response?.data?.message || 'An error occurred while creating the wallet.',
        color: 'red',
        title: 'Error',
      });
    },
  });
};
