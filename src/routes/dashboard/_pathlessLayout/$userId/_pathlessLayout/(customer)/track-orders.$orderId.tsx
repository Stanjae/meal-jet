import { useEffect } from 'react';
import {
  IconClock,
  IconMapPin,
  IconReceipt,
  IconRoute,
  IconTruckDelivery,
} from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Avatar, Badge, Divider, Group, Paper, Progress, SimpleGrid } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import MRingJLoader from '@/components/atoms/loader/MRingJLoader';
import MJOrderStatusTimeline from '@/components/molecules/timeline/MJOrderStatusTimeline';
import NotFoundComponent from '@/components/organisms/notfound/NotFoundComponent';
import { useGetOrderById } from '@/lib/api/services';
import {
  getOrderProgress,
  statusConfig,
  statusHistoryStates,
  statusTimelineMessages,
} from '@/lib/constants';
import socket from '@/lib/socket.io/socketConfig';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType } from '@/lib/types';
import { formatCurrency, newDayJs, requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/track-orders/$orderId'
)({
  beforeLoad: () => requireRole([UserType.CUSTOMER]),
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const { data: orderData, refetch, isRefetching, isLoading } = useGetOrderById(orderId);

  const { user } = useMealJetStore((state) => state);

  useEffect(() => {
    const onDeliveryUpdate = (payload: {
      orderId: string;
      orderNumber: string;
      status?: statusHistoryStates;
    }) => {
      if (payload.orderId !== orderId) return;
      void refetch();
    };
    socket.on('order_update_to_customer', onDeliveryUpdate);

    return () => {
      socket.off('order_update_to_customer', onDeliveryUpdate);
    };
  }, [orderId, refetch]);

  /*
  useEffect(() => {

    const onOrderAssigned = (payload: { orderId: string; orderNumber: string }) => {
      if (!hasTrackedOrder(payload)) return;

      notifications.show({
        title: 'Rider assigned',
        message: `${payload.orderNumber} now has a rider assigned.`,
        color: 'indigo',
      });

      void refreshTrackData();
    };

    const onRefundPending = (payload: { orderId: string; orderNumber: string }) => {
      if (!hasTrackedOrder(payload)) return;

      notifications.show({
        title: 'Refund in progress',
        message: `Refund processing started for ${payload.orderNumber}.`,
        color: 'yellow',
      });

      void refreshTrackData();
    };

    const onRefunded = (payload: { orderId: string; orderNumber: string }) => {
      if (!hasTrackedOrder(payload)) return;

      notifications.show({
        title: 'Refund completed',
        message: `${payload.orderNumber} has been refunded successfully.`,
        color: 'green',
      });

      void refreshTrackData();
    };

    const onDispatchExhausted = (payload: { orderId: string; orderNumber: string }) => {
      if (!hasTrackedOrder(payload)) return;

      notifications.show({
        title: 'Dispatch delayed',
        message: `${payload.orderNumber} is taking longer than expected to assign a rider.`,
        color: 'yellow',
      });

      void refreshTrackData();
    };

    socket.on('order_delivery_update', onDeliveryUpdate);
    socket.on('order_assigned', onOrderAssigned);
    socket.on('order_refund_pending', onRefundPending);
    socket.on('order_refunded', onRefunded);
    socket.on('dispatch_exhausted', onDispatchExhausted);

    return () => {
      socket.off('order_delivery_update', onDeliveryUpdate);
      socket.off('order_assigned', onOrderAssigned);
      socket.off('order_refund_pending', onRefundPending);
      socket.off('order_refunded', onRefunded);
      socket.off('dispatch_exhausted', onDispatchExhausted);
    };
  }, [checkoutId, orders]); */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <MRingJLoader size={'md'} />
      </div>
    );
  }

  if (!orderData) {
    return <NotFoundComponent errorType="404" />;
  }

  const status = orderData.status as statusHistoryStates;
  const currentCfg = statusConfig[status] || {
    color: 'gray',
    variant: 'filled' as const,
  };
  const progress = getOrderProgress(status);

  return (
    <section className="space-y-5 max-w-7xl mx-auto">
      <Paper p="lg" shadow="xs" radius="md" className="border border-gray-100">
        <Group justify="space-between" align="flex-start">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Track Your Orders</h1>
            {isRefetching && (
              <p className="text-xs text-indigo-500 mt-1">Syncing latest updates...</p>
            )}
          </div>
          <Badge size="lg" color="indigo" variant="light" leftSection={<IconClock size={14} />}>
            {orderData.estimatedDeliveryTime
              ? `Latest ETA ${newDayJs(new Date(orderData.estimatedDeliveryTime as Date).toISOString()).fromNow()}`
              : 'ETA pending'}
          </Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" mt="md">
          <div className="rounded-xl border border-gray-100 p-3 bg-gray-50/70">
            <p className="text-xs text-gray-500">Delivery Address</p>
            <p className="font-semibold text-sm text-gray-800 mt-1 flex items-start gap-2">
              <IconMapPin size={15} className="mt-0.5" />{' '}
              {orderData?.deliveryAddress?.formattedAddress || 'N/A'}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 p-3 bg-gray-50/70">
            <p className="text-xs text-gray-500">Payment Method</p>
            <p className="font-semibold text-sm text-gray-800 mt-1 capitalize">
              {orderData?.paymentMethod || 'N/A'}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 p-3 bg-gray-50/70">
            <p className="text-xs text-gray-500">Grand Total</p>
            <p className="font-semibold text-sm text-gray-800 mt-1">
              {formatCurrency(orderData?.total, 'NGN')}
            </p>
          </div>
        </SimpleGrid>
      </Paper>

      <SimpleGrid cols={{ base: 1, xl: 3 }} spacing="lg">
        <div className="xl:col-span-2 space-y-4">
          <Paper p="md" shadow="xs" radius="md" className="border border-gray-100">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar src={orderData?.vendor?.logo} alt={orderData?.vendor?.name} radius="xl" />
                <div>
                  <h3 className="font-bold text-gray-900">{orderData?.vendor?.name}</h3>
                  <p className="text-xs text-gray-500">{orderData?.orderNumber}</p>
                </div>
              </div>
              <Badge color={currentCfg.color} variant="light">
                {statusTimelineMessages[status as statusHistoryStates]?.title}
              </Badge>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-500">Order Progress</p>
                <p className="text-xs font-semibold text-gray-700">{progress}%</p>
              </div>
              <Progress value={progress} color={currentCfg.color} radius="xl" />
            </div>

            <Divider my="md" />

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  Items
                </p>
                <div className="space-y-1.5">
                  {orderData?.items?.map((item, idx) => (
                    <p key={`${item.id}-${idx}`} className="text-sm text-gray-700">
                      <span className="font-semibold">{item.quantity}x</span> {item.title}
                    </p>
                  ))}
                </div>

                <Divider my="sm" />

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(orderData?.subtotal, 'NGN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery Fee</span>
                    <span>{formatCurrency(orderData?.deliveryFee, 'NGN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Service Fee</span>
                    <span>{formatCurrency(orderData?.serviceFee, 'NGN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatCurrency(orderData?.total, 'NGN')}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  Status Timeline
                </p>
                <MJOrderStatusTimeline statusHistory={orderData?.statusHistory} />
              </div>
            </SimpleGrid>
            {orderData?.status === statusHistoryStates.on_the_way && (
              <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 p-2.5 text-xs text-blue-700">
                <p className="font-semibold flex items-center gap-1.5">
                  <IconTruckDelivery size={14} /> Rider is approaching your location.
                </p>
              </div>
            )}

            {orderData?.status === statusHistoryStates.cancelled && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-100 p-2.5 text-xs text-red-700">
                <p className="font-semibold">Order cancelled</p>
                <p className="mt-0.5">Refund status will be updated shortly.</p>
              </div>
            )}

            {orderData?.status === statusHistoryStates.refunded && (
              <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-2.5 text-xs text-gray-700">
                <p className="font-semibold">Refund completed</p>
                <p className="mt-0.5">The order amount has been refunded for this order.</p>
              </div>
            )}
          </Paper>
        </div>

        <div className="space-y-4">
          <Paper p="md" shadow="xs" radius="md" className="border border-gray-100">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <IconReceipt size={16} /> Payment Summary
            </h3>
            <Divider my="sm" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Total Delivery Fees</span>
                <span>{formatCurrency(orderData?.deliveryFee, 'NGN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Service Fees</span>
                <span>{formatCurrency(orderData?.serviceFee, 'NGN')}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold text-base">
                <span>Grand Total</span>
                <span>{formatCurrency(orderData?.total, 'NGN')}</span>
              </div>
            </div>
          </Paper>

          <Paper p="md" shadow="xs" radius="md" className="border border-gray-100">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <IconRoute size={16} /> Quick Actions
            </h3>
            <div className="space-y-2 mt-3">
              <Link
                to="/dashboard/$userId"
                params={{ userId: user?.id as string }}
                className="block"
              >
                <MJButton fullWidth variant="outline">
                  Back to Dashboard
                </MJButton>
              </Link>
              <MJButton variant="outline" fullWidth>
                Contact Support
              </MJButton>
            </div>
          </Paper>
        </div>
      </SimpleGrid>
    </section>
  );
}
