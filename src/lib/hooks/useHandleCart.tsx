import { useNavigate } from '@tanstack/react-router';
import { useHandleCheckout } from '../api/services';
import { useMealJetStore } from '../store/zustand.store';
import type { MJAddToCartItem } from '../types';

const useHandleCart = () => {
  const navigate = useNavigate();
  const {
    user,
    cart,
    removeItem,
    clearCart,
    noteForVendor,
    setNoteForVendor,
    setCheckoutOrderSummary,
  } = useMealJetStore((state) => state);
  const { mutateAsync, isPending } = useHandleCheckout();

  const handleContinueToCheckout = async (cartItemsOverride?: MJAddToCartItem[]) => {
    try {
      const cartItems = cartItemsOverride ? cartItemsOverride : Array.from(cart.values());
      const response = await mutateAsync(cartItems);
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

  const handleRemoveItem = (id: string) => removeItem(id);
  return {
    cart,
    handleRemoveItem,
    clearCart,
    noteForVendor,
    setNoteForVendor,
    handleContinueToCheckout,
    isPending,
  };
};

export default useHandleCart;
