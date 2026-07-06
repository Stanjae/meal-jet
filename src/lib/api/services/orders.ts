import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import type { TGetAllVendorOrdersParams } from '@/lib/types';
import { ENDPOINTS } from '../clients';
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

export const useGetVendorOrders = (params: TGetAllVendorOrdersParams) => {
  return useQuery({
    queryKey: [ENDPOINTS.getVendorOrders, params],
    enabled: Boolean(params.vendorId),
    queryFn: async () => await ordersClient.getVendorOrders(params),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersClient.updateOrderStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getVendorOrders] });
      notifications.show({
        title: 'Order Status Updated',
        message: data.message,
        color: 'green',
      });
    },
  });
};

export const useRiderAcceptDispatch = () => {
  return useMutation({
    mutationFn: ordersClient.riderAcceptDispatch,
    onSuccess: (data) => {
      notifications.show({
        title: 'Dispatch Accepted',
        message: data.message,
        color: 'green',
      });
    },
  });
};

export const useVendorRetryDispatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersClient.vendorRetryDispatch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getVendorOrders] });
      notifications.show({
        title: 'Dispatch Retry Started',
        message: `${data.message} (attempt ${data.data.retryCount})`,
        color: 'green',
      });
    },
  });
};

export const useRiderUpdateDeliveryStatus = () => {
  return useMutation({
    mutationFn: ordersClient.riderUpdateDeliveryStatus,
    onSuccess: (data) => {
      notifications.show({
        title: 'Delivery Updated',
        message: data.message,
        color: 'green',
      });
    },
  });
};
