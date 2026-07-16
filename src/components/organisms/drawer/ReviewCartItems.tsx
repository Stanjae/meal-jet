import { useState } from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { Alert, Paper } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJDrawer from '@/components/atoms/drawer/MJDrawer';
import CartItemCard from '@/components/molecules/cards/CartItemCard';
import { useHandleCart } from '@/lib/hooks';
import { useMealJetStore } from '@/lib/store/zustand.store';
import type { TRevalidateCheckoutSessionResponse } from '@/lib/types';

type Props = {
  opened: boolean;
  onClose: () => void;
  data: TRevalidateCheckoutSessionResponse | undefined;
  setData?: (data: TRevalidateCheckoutSessionResponse | undefined) => void;
};
const ReviewCartItems = ({ opened, onClose, data, setData }: Props) => {
  const isButtonDisabled = Array.isArray(data?.cartErrors) && data?.cartErrors?.length > 0;

  const { addToCart } = useMealJetStore((state) => state);

  const [hasAddedToCart, setHasAddedToCart] = useState(false);

  const { handleContinueToCheckout } = useHandleCart();

  const handleRemoveItem = (itemId: string) => {
    if (setData && data?.order?.items) {
      const updatedItems = data?.order?.items?.filter((item) => item.id !== itemId);
      setData({
        ...data,
        order: {
          ...data.order,
          items: updatedItems || [],
        },
      });
    }
  };

  const handleAddToCart = () => {
    const hasError = data?.order?.items?.some((item) =>
      data?.cartDetailedErrors?.some((error) => error.itemId === item.id)
    );
    const hasVendorError = data?.cartDetailedErrors?.some((error) => error.type === 'vendor');
    if (hasError) {
      notifications.show({
        title: 'Cart Errors',
        message:
          data?.cartDetailedErrors
            ?.filter((error) => error.type === 'item')
            .map((error) => error.message)
            .join(', ') + '. Delete the item(s) with errors to proceed to checkout.' ||
          'Some items are no longer available.',
        color: 'red',
      });
      return;
    }
    if (hasVendorError) {
      notifications.show({
        title: 'Vendor Errors',
        message:
          data?.cartDetailedErrors
            ?.filter((error) => error.type === 'vendor')
            .map((error) => error.message)
            .join(', ') || 'This vendors are no longer available.',
        color: 'red',
      });
      return;
    }

    data?.order?.items?.forEach((menuItem) => {
      addToCart(`${menuItem?.id}-${randomId()}` as string, {
        title: menuItem?.title as string,
        id: menuItem?.id as string,
        quantity: menuItem?.quantity as number,
        price: menuItem?.price as number,
        imageUrl: menuItem?.imageUrl as string,
        totalQuantity: menuItem?.quantity as number,
        vendorId: menuItem?.vendorId,
        vendorName: menuItem?.vendorName,
        vendorImage: menuItem?.vendorImage,
        vendorSlug: menuItem?.vendorSlug,
        vendorLocation: menuItem?.vendorLocation,
        vendorDeliveryFee: menuItem?.vendorDeliveryFee,
        addons: menuItem?.addons || [],
      });
    });
    notifications.show({
      title: 'Added to Cart',
      message: `Successfully added to your cart.`,
      color: 'green',
    });
    setHasAddedToCart(true);
  };

  const handleProceedToCheckout = async () => {
    if (isButtonDisabled) {
      notifications.show({
        title: 'Cart Errors',
        message:
          data?.cartDetailedErrors
            ?.filter((error) => error.type === 'item')
            .map((error) => error.message)
            .join(', ') + '. Delete the item(s) with errors to proceed to checkout.' ||
          'Some items are no longer available.',
        color: 'red',
      });
      return;
    }
    await handleContinueToCheckout(data?.order?.items);
  };

  return (
    <MJDrawer
      title="Review Cart Items"
      size={'lg'}
      position="bottom"
      opened={opened}
      onClose={onClose}
      onExitTransitionEnd={() => {
        setHasAddedToCart(false);
      }}
    >
      <div className="grid grid-cols-12 gap-4 mb-4">
        <Paper className="col-span-12 md:col-span-8 p-4 space-y-4">
          <Alert
            icon={<IconAlertTriangle />}
            title="Cart Errors"
            color="red"
            variant="light"
            hidden={!isButtonDisabled}
          >
            <ul>
              {data?.cartErrors?.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
          {data?.order?.items?.map((product, index) => (
            <CartItemCard
              index={index}
              key={product.id}
              id={product.id}
              product={product}
              deleteAction={() => handleRemoveItem(product.id)}
            />
          ))}
        </Paper>
        <Paper className="col-span-12 md:col-span-4 p-4 space-y-3">
          <MJButton disabled={isButtonDisabled} onClick={handleProceedToCheckout} fullWidth>
            Proceed to Checkout
          </MJButton>
          <MJButton disabled={hasAddedToCart} onClick={handleAddToCart} variant="outline" fullWidth>
            Add to Cart
          </MJButton>
        </Paper>
      </div>
    </MJDrawer>
  );
};

export default ReviewCartItems;
