import { IconShoppingCart } from '@tabler/icons-react';
import { Divider, Drawer, Indicator } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import CartItemCard from '@/components/molecules/cards/CartItemCard';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { ApplicationCharges } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

const AddtoCart = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { cart, updateQuantity } = useMealJetStore((state) => state);

  const total =
    Array.from(cart.values()).reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0) + ApplicationCharges.SERVICE_CHARGES;

  return (
    <>
      <Indicator onClick={open} inline label={cart.size} color="red" size={20}>
        <IconShoppingCart color="green" size={30} />
      </Indicator>

      <Drawer.Root opened={opened} position="right" onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title className="text-lg font-semibold">Add to Cart</Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Divider color="m-orange" />
          <Drawer.Body>
            {cart.size === 0 && <p className="py-2 text-center">Your cart is empty</p>}
            {cart.size > 0 && (
              <section className="py-2 space-y-2">
                {[...cart.entries()].map(([id, product]) => (
                  <CartItemCard
                    key={id}
                    product={product}
                    increase={() => updateQuantity(id, 1)}
                    decrease={() => updateQuantity(id, -1)}
                  />
                ))}
                <Divider my={'md'} color="m-orange" />
                <section className="space-y-2">
                  <div className=" flex justify-between items-center">
                    <span className="text-sm">Service Charge</span>
                    <span className="text-base">
                      +{formatCurrency(ApplicationCharges.SERVICE_CHARGES, 'NGN')}
                    </span>
                  </div>
                  <div className=" flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className=" text-xl font-semibold text-primary">
                      {formatCurrency(total, 'NGN')}
                    </span>
                  </div>
                </section>

                <MJButton size="md" className="w-full mt-2">
                  Checkout
                </MJButton>
              </section>
            )}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export default AddtoCart;
