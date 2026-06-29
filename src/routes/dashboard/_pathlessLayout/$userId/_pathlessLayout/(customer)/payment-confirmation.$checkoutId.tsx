import {
  IconCircleCheckFilled,
  IconClock,
  IconExternalLink,
  IconMapPinFilled,
} from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Avatar, Badge, Divider, Grid, GridCol, Paper, SimpleGrid } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import NotFoundComponent from '@/components/organisms/notfound/NotFoundComponent';
import ordersClient from '@/lib/api/clients/orders';
import { statusConfig, type TStatusConfig } from '@/lib/constants';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType } from '@/lib/types';
import { formatCurrency, requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/payment-confirmation/$checkoutId'
)({
  beforeLoad: () => requireRole(UserType.CUSTOMER),
  component: RouteComponent,
  loader: async ({ params: { checkoutId } }) => await ordersClient.getOrderDetails(checkoutId),
});

function RouteComponent() {
  const {
    data: {
      orders,
      grandTotal,
      totalServiceFee,
      totalDeliveryFee,
      checkoutId: validCheckoutId,
      paymentType,
      deliveryAddress,
    },
  } = Route.useLoaderData();

  const user = useMealJetStore((state) => state.user);

  const { checkoutId } = Route.useParams();

  if (checkoutId !== validCheckoutId) {
    return <NotFoundComponent errorType="400" />;
  }

  return (
    <section>
      <Paper p={'lg'} shadow="sm" className="flex gap-3 items-center justify-center">
        <IconCircleCheckFilled size={60} color="green" />
        <div>
          <h1>Payment confirmed successfully!</h1>
          <p className="text-gray-400 text-sm">
            Your payment was confirmed. All restaurants involved have been notified and are
            preparing your food.
          </p>
        </div>
        <Badge className="ml-auto" size="md" variant="light" leftSection={<IconClock size={18} />}>
          Estimated delivery: 30 – 45 mins
        </Badge>
      </Paper>
      <Grid gutter={{ base: 30 }} mt={20} overflow="hidden">
        <GridCol span={6}>
          <h2 className="mb-3 font-semibold">Your Orders</h2>
          <div className="flex flex-col">
            {orders.map((order) => {
              const { color } = statusConfig[order?.status as TStatusConfig];
              const total =
                (order?.subtotal || 0) + (order?.deliveryFee || 0) + (order?.serviceFee || 0);
              return (
                <Paper key={order.id} p="md" shadow="xs" className="mb-3 overflow-hidden">
                  <div className="flex gap-3">
                    <Avatar
                      size={'lg'}
                      src={order?.vendor?.logo}
                      radius={'lg'}
                      alt={order?.vendor?.name}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{order?.vendor?.name}</h3>
                      <p className="text-sm text-gray-500">{order?.orderNumber}</p>
                    </div>
                    <Badge className="ml-auto" variant="light" color={color}>
                      {order?.status}
                    </Badge>
                  </div>
                  <Divider my="sm" />
                  <div>
                    <SimpleGrid spacing={16} cols={2}>
                      <section>
                        <h4 className="font-medium text-md text-gray-600 mb-2">Items</h4>
                        <div className="space-y-2">
                          {order?.items.map((item, idx) => {
                            return (
                              <div key={idx}>
                                <p className="font-semibold text-base">
                                  {item?.title} - X{item.quantity}
                                </p>
                                <div>
                                  {item?.addons?.map((addon, idx) => (
                                    <div key={idx} className="text-sm text-gray-600">
                                      <span>{addon.name}</span>
                                      <ul className="space-y-1 list-inside list-disc">
                                        {addon.options
                                          .filter(
                                            (option) => option.quantity && option.quantity > 0
                                          )
                                          .map((option, idx) => (
                                            <li key={idx} className="text-xs ml-1 text-gray-400">
                                              {option.label}
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                      <section>
                        <h4 className="font-medium text-md text-gray-600 mb-2">Fees</h4>
                        <section>
                          <div className="flex justify-between gap-2">
                            <span className="text-sm text-gray-400">Subtotal</span>
                            <span className="text-sm font-semibold">
                              {formatCurrency(order?.subtotal as number, 'NGN')}
                            </span>
                          </div>
                          <div className="flex justify-between gap-2">
                            <span className="text-sm text-gray-400">Delivery Fee</span>
                            <span className="text-sm font-semibold">
                              {formatCurrency(order?.deliveryFee as number, 'NGN')}
                            </span>
                          </div>
                          <div className="flex justify-between gap-2">
                            <span className="text-sm text-gray-400">Service Charge</span>
                            <span className="text-sm font-semibold">
                              {formatCurrency(order?.serviceFee as number, 'NGN')}
                            </span>
                          </div>
                        </section>
                        <Divider my="xs" />
                        <section className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{formatCurrency(total, 'NGN')}</span>
                        </section>
                      </section>
                    </SimpleGrid>
                  </div>
                </Paper>
              );
            })}
          </div>

          <Paper p="md" shadow="xs" className="mb-3 overflow-hidden">
            <div className="flex gap-3">
              <div className="size-9 rounded-full bg-gray-950 p-2 flex items-center justify-center">
                <IconMapPinFilled color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Deliverying To</h3>
                <p className="text-base text-gray-500">{deliveryAddress?.formattedAddress}</p>
              </div>
            </div>
          </Paper>
        </GridCol>
        <GridCol span={6}>
          <Paper p="md" shadow="xs" className="mb-3 overflow-hidden">
            <div>
              <span className="ml-5 font-medium text-primary pb-3 border-b-3 border-b-primary">
                Payment Summary
              </span>
              <Divider my="sm" size={'md'} />
            </div>
            <div>
              <section>
                <div className="space-y-2">
                  {orders?.map((item, idx) => {
                    return (
                      <div key={idx} className="flex justify-between gap-2">
                        <span className="text-sm text-gray-400">
                          Subtotal - {item?.vendor?.name}
                        </span>
                        <span className="text-sm font-semibold">
                          {formatCurrency(item?.subtotal as number, 'NGN')}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Divider my="xs" />
                <div>
                  <div className="flex justify-between gap-2">
                    <span className="text-sm text-gray-400">Total Delivery Fees</span>
                    <span className="text-sm font-semibold">
                      {formatCurrency(totalDeliveryFee, 'NGN')}
                    </span>
                  </div>

                  <div className="flex justify-between gap-2">
                    <span className="text-sm text-gray-400">Total Service Charges</span>
                    <span className="text-sm font-semibold">
                      {formatCurrency(totalServiceFee, 'NGN')}
                    </span>
                  </div>
                </div>
                <Divider my="xs" />
                <div className="flex justify-between gap-2">
                  <h3 className="text-lg font-medium">GrandTotal</h3>
                  <span className="text-lg font-semibold">{formatCurrency(grandTotal, 'NGN')}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="size-2 bg-secondary rounded-full" />
                  <p className="font-medium text-sm text-700">Paid by {paymentType}</p>
                </div>
              </section>
            </div>
          </Paper>

          <div className="space-y-3 mt-4">
            <Link
              className="block"
              to={`/dashboard/$userId/track-orders/$checkoutId`}
              params={{ userId: user?.id as string, checkoutId: checkoutId }}
            >
              <MJButton variant="outline" fullWidth rightSection={<IconExternalLink />}>
                Track My Orders
              </MJButton>
            </Link>
            <MJButton variant="outline" fullWidth>
              Back to Dashboard
            </MJButton>
          </div>

          <Paper p="md" shadow="xs" className="my-4 overflow-hidden">
            <h4 className="font-medium">Need Help</h4>
            <p className="text-sm my-2">
              Having an issue with your order? Our support team is available 24/7. Contact support
            </p>
            <Link className="text-primary" to={'/'}>
              Contact Support
            </Link>
          </Paper>
        </GridCol>
      </Grid>
    </section>
  );
}
