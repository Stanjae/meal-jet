import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import paymentClient from '../clients/payment';

export const useHandleInitializePayment = () => {
  return useMutation({
    mutationFn: paymentClient.handleInitializePayment,
    onError: (error: AxiosError) => {
      const newError = error as AxiosError<{ message: string }>;
      notifications.show({
        title: 'Payment Failed',
        message: newError.response?.data?.message || newError.message,
        color: 'red',
      });
    },
  });
};
