import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import ordersClient from '../clients/orders';

export const useHandleCheckout = () => {
  return useMutation({
    mutationFn: ordersClient.handleCheckout,
    onSuccess: (data) => {
      notifications.show({
        title: 'Checkout Successful',
        message: data.message,
        color: 'green',
      });
    },
  });
};
