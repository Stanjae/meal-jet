import { useState } from 'react';
import { IconChevronRight, IconNote, IconShoppingCart, IconTrash } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { ActionIcon, Checkbox, Divider, Drawer, Indicator } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJTextArea from '@/components/atoms/inputs/MJTextArea';
import MJModal from '@/components/atoms/modals/MJModal';
import CartItemCard from '@/components/molecules/cards/CartItemCard';
import { useHandleCheckout } from '@/lib/api/services';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

const AddtoCart = () => {
  const {
    user,
    cart,
    removeItem,
    clearCart,
    noteForVendor,
    setNoteForVendor,
    setCheckoutOrderSummary,
  } = useMealJetStore((state) => state);
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync, isPending } = useHandleCheckout();

  const navigate = useNavigate();

  console.log(cart);

  const [openedNoteModal, { open: openNoteModal, close: closeNoteModal }] = useDisclosure(false);

  const [note, setNote] = useState(noteForVendor || '');

  const total = Array.from(cart.values()).reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const handleRemoveItem = (id: string) => removeItem(id);

  const handleAddNoteForVendor = () => {
    setNoteForVendor(note);
    closeNoteModal();
  };

  const handleContinueToCheckout = async () => {
    try {
      const cartItems = Array.from(cart.values());
      const response = await mutateAsync(cartItems);
      console.log(response);
      setCheckoutOrderSummary(response.data);
      navigate({
        to: '/dashboard/$userId/store/checkout',
        params: { userId: user?.id as string },
        search: { checkoutId: response?.data?.checkoutSessionId },
        replace: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

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
              <section className="py-2 space-y-2.5">
                {[...cart.entries()].map(([id, product], index) => (
                  <CartItemCard
                    index={index}
                    key={id}
                    id={id}
                    product={product}
                    deleteAction={() => handleRemoveItem(id)}
                  />
                ))}
                <MJButton
                  leftSection={<IconTrash />}
                  radius={35}
                  variant="light"
                  onClick={clearCart}
                  size="sm"
                  className="mt-2"
                >
                  Clear Cart
                </MJButton>
                <Divider my={'md'} color="m-orange" />
                {/* NOTE : LEAVE A NOTE FOR THE VENDOR */}
                <div
                  onClick={openNoteModal}
                  className="flex cursor-pointer items-center gap-2 my-5"
                >
                  <IconNote />
                  <div>
                    <h4 className="font-semibold text-sm">Leave a note for the vendor</h4>
                    <p className="text-xs text-gray-400">
                      {noteForVendor || 'Any requests or special vendor instructions etc.'}
                    </p>
                  </div>
                  <ActionIcon variant="subtle" className="ml-auto">
                    <IconChevronRight />
                  </ActionIcon>
                </div>
                <Divider my={'md'} color="m-orange" />
                <section className="space-y-2">
                  <div className=" flex justify-between items-center">
                    <span className="font-medium">Subtotal</span>
                    <span className=" text-xl font-semibold text-primary">
                      {formatCurrency(total, 'NGN')}
                    </span>
                  </div>
                </section>

                <MJButton
                  onClick={handleContinueToCheckout}
                  size="md"
                  className="w-full mt-2"
                  loading={isPending}
                  disabled={isPending}
                >
                  Continue to Checkout
                </MJButton>
              </section>
            )}
            <MJModal
              centered
              opened={openedNoteModal}
              onClose={closeNoteModal}
              title="Vendor Instructions"
            >
              <MJTextArea
                label="Instructions for Vendor"
                size="md"
                mb={10}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <Checkbox label="Save for later" />

              <MJButton onClick={handleAddNoteForVendor} fullWidth mt="md">
                Add Instruction
              </MJButton>
            </MJModal>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export default AddtoCart;
