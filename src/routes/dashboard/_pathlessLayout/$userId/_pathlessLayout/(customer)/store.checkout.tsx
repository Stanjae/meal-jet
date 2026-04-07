import { useMemo, useState } from 'react';
import {
  IconAlertCircle,
  IconArrowNarrowLeft,
  IconBike,
  IconChevronRight,
  IconMapPinCheck,
} from '@tabler/icons-react';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { z } from 'zod/v4';
import { Avatar, Badge, Divider, Grid, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import AddUpdateLocationModal from '@/components/molecules/modals/AddUpdateLocationModal';
import NotFoundComponent from '@/components/organisms/notfound/NotFoundComponent';
import PaymentOptionsWidget from '@/components/organisms/payment-options/PaymentOptionsWidget';
import { useHandleInitializePayment } from '@/lib/api/services';
import socket from '@/lib/socket.io/socketConfig';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType, type TPaymentMenthod } from '@/lib/types';
import { formatCurrency, requireRole } from '@/lib/utils/helpers/helpers';
import { stringSchema } from '@/lib/utils/schema/zod';

const checkoutSearchSchema = z.object({
  checkoutId: stringSchema().default(''),
});

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/store/checkout'
)({
  component: RouteComponent,
  validateSearch: checkoutSearchSchema,
  beforeLoad: () => requireRole(UserType.CUSTOMER),
});

function RouteComponent() {
  const { checkoutId } = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate();
  const [locationWidgetOpened, { open: openLocationWidget, close: closeLocationWidget }] =
    useDisclosure(false);

  const { user, cart, checkoutOrderSummary } = useMealJetStore((state) => state);

  const [paymentMethod, setPaymentMethod] = useState({ type: '', option: '' });

  const { mutateAsync, isPending } = useHandleInitializePayment();

  /* const handleCartItemsTransform = useCallback(() => {
    const vendorMap = new Map<
      string,
      {
        vendorId: string;
        vendorImage: string;
        vendorName: string;
        vendorSlug: string;
        vendorDeliveryFee: number;
        vendorLocation: ILocation;
        calculatedDistanceKm: string;
        calculatedDeliveryFee: number;
        items: MJAddToCartItem[];
      }
    >();

    for (const product of cart.values()) {
      const existing = vendorMap.get(product.vendorId);
      if (existing) {
        existing.items.push(product);
      } else {
        const { vendorId, vendorImage, vendorName, vendorSlug, vendorDeliveryFee, vendorLocation } =
          product;
        const { distanceKm, fee } = getDistanceInKmAndFees(
          vendorLocation.coordinates[0],
          vendorLocation.coordinates[1],
          user?.location.coordinates[0] as number,
          user?.location.coordinates[1] as number,
          vendorDeliveryFee
        );
        vendorMap.set(vendorId, {
          vendorId,
          vendorImage,
          vendorName,
          vendorSlug,
          vendorDeliveryFee,
          vendorLocation,
          calculatedDistanceKm: distanceKm,
          calculatedDeliveryFee: fee,
          items: [product],
        });
      }
    }

    return Array.from(vendorMap.values());
  }, [cart, user]); */

  const calculatedTotalOrders = useMemo(() => {
    return [
      {
        title: 'Subtotal',
        value: checkoutOrderSummary?.summary?.totalSubtotal || 0,
        count: cart.size,
      },
      {
        title: 'Delivery Fee',
        value: checkoutOrderSummary?.summary?.totalDeliveryFee || 0,
      },
      {
        title: 'Service Fee',
        value: checkoutOrderSummary?.summary?.totalServiceCharge || 0,
      },
    ];
  }, [checkoutOrderSummary.summary, cart.size]);

  const total = useMemo(() => {
    return checkoutOrderSummary?.summary?.grandTotal || 0;
  }, [checkoutOrderSummary.summary]);

  const handlePlaceOrder = async () => {
    try {
      const selectedPaymentMethod =
        paymentMethod.type === 'pay-online' ? paymentMethod.option : paymentMethod.type;
      const response = await mutateAsync({
        checkoutSessionId: checkoutOrderSummary.checkoutSessionId,
        paymentMethod: selectedPaymentMethod as TPaymentMenthod,
      });
      window.open(response.data.paymentUrl);

      // Start listening for socket confirmation
      socket.on('checkout_success', () => {}); //handleCheckoutSuccess);
      socket.on('checkout_failed', () => {}); //handleCheckoutFailed);
    } catch (error) {
      console.error(error);
    }
  };

  if (checkoutId !== checkoutOrderSummary.checkoutSessionId) {
    return <NotFoundComponent errorType="404" />;
  }

  return (
    <section>
      <div className="mb-5">
        <MJButton
          onClick={() => router.navigate({ to: '..', search: {} })}
          leftSection={<IconArrowNarrowLeft />}
          variant="transparent"
          pl={0}
        >
          Back to Vendor
        </MJButton>
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </div>

      <Grid overflow="hidden">
        <Grid.Col span={7}>
          <Paper shadow="sm" className="h-full" radius={16} py={16} px={0}>
            <div>
              <span className="ml-5 font-medium text-primary pb-3 border-b-3 border-b-primary">
                Delivery
              </span>
              <Divider my="sm" size={'md'} />
            </div>
            <section className="px-5 pb-5">
              <p className="text-primary text-sm inline-flex items-center gap-1">
                <IconAlertCircle size={16} /> Pin required for delivery
              </p>

              <div className="space-y-1 mt-3">
                <section
                  onClick={openLocationWidget}
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <IconMapPinCheck size={20} />
                  <div>
                    <h4
                      title={user?.currentAddress?.formattedAddress}
                      className="font-semibold mb-1"
                    >
                      {user?.currentAddress?.formattedAddress || 'Select a delivery location'}
                    </h4>
                    <p className="text-xs font-medium text-gray-400">Delivery address</p>
                  </div>
                  <IconChevronRight className="ml-auto" />
                </section>
                <Divider my="md" />
                <section className="flex cursor-pointer items-center gap-2.5">
                  <IconBike size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Leave a note for your rider</h4>
                    <p className="text-xs font-medium text-gray-400">
                      Any instruction for a smooth delivery
                    </p>
                  </div>
                  <IconChevronRight className="ml-auto" />
                </section>
              </div>
            </section>
            {/* payment method */}
            <div className="mt-10">
              <span className="ml-5 text-sm font-medium text-primary pb-3.5 border-b border-b-primary">
                Payment method
              </span>
              <Divider my="sm" />
              <div className="px-5 pt-3">
                <PaymentOptionsWidget
                  setPaymentMethod={setPaymentMethod}
                  paymentMethod={paymentMethod}
                />
              </div>
            </div>
          </Paper>
        </Grid.Col>
        <Grid.Col span={5}>
          <Paper shadow="sm" radius={16} py={16} px={0}>
            <div>
              <span className="ml-5 font-medium text-primary pb-3 border-b-3 border-b-primary">
                Order Summary
              </span>
              <Divider my="sm" size={'md'} />
            </div>
            <section className="px-5 space-y-5 pt-3 h-80 overflow-y-auto">
              {checkoutOrderSummary?.summary?.newCart?.map((vendor, index) => (
                <div key={index}>
                  <div className="flex gap-2">
                    <Avatar size="md" src={vendor.vendorImage} />
                    <div>
                      <h4 className="font-semibold">{vendor.vendorName}</h4>
                      <p className="text-xs text-gray-400">{vendor.items.length} item(s)</p>
                    </div>
                    <MJButton
                      onClick={() =>
                        navigate({
                          to: '/dashboard/$userId/store/$storeSlug',
                          params: { userId: user?.id as string, storeSlug: vendor.vendorSlug },
                        })
                      }
                      variant="subtle"
                      radius={35}
                      className="ml-auto"
                      size="xs"
                    >
                      Edit
                    </MJButton>
                  </div>
                  <section className="space-y-2 mt-3">
                    {vendor.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="border gap-2 flex border-gray-200 px-4 py-2 rounded-md"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-16 h-10 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium underline">{item.title}</h4>
                          <p className="text-sm text-gray-400">
                            {formatCurrency(item.price, 'NGN')}
                          </p>
                        </div>
                        <Badge className="ml-auto" size="sm">
                          X{item.quantity}
                        </Badge>
                      </div>
                    ))}
                  </section>
                </div>
              ))}
            </section>
            <div className="mt-10">
              <span className="ml-5 text-sm font-medium text-primary pb-3.5 border-b border-b-primary">
                Order Total
              </span>
              <Divider my="sm" />
              <div className="px-5 pt-3">
                {calculatedTotalOrders.map((order, index) => (
                  <div key={index} className="flex justify-between">
                    <p className="text-sm font-medium">
                      {order.title} {order?.count ? `(${order.count})` : ''}
                    </p>
                    <span className="font-medium text-gray-500 text-sm">
                      {formatCurrency(order.value, 'NGN')}
                    </span>
                  </div>
                ))}
              </div>
              <Divider my="sm" />
              <div className="flex justify-between px-5">
                <p className="font-semibold">Total</p>
                <span className="font-semibold">{formatCurrency(total, 'NGN')}</span>
              </div>
            </div>
            <div className="px-5 mt-3">
              <MJButton
                onClick={handlePlaceOrder}
                disabled={!paymentMethod.type || isPending}
                loading={isPending}
                fullWidth
                radius={8}
                size="md"
              >
                Place Order
              </MJButton>
            </div>
          </Paper>
        </Grid.Col>
      </Grid>
      <AddUpdateLocationModal opened={locationWidgetOpened} onClose={closeLocationWidget} />
    </section>
  );
}
