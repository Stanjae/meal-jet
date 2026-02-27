import MJActionGroupButton from '@/components/atoms/buttons/MJActionGroupButton';
import type { MJAddToCartItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

type Props = {
  product: MJAddToCartItem;
  increase: () => void;
  decrease: () => void;
};

const CartItemCard = ({ product, increase, decrease }: Props) => {
  return (
    <section className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg">
      <div className="size-16.75 rounded-md border border-primary">
        <img className="w-full h-full" src={product.imageUrl} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className=" font-semibold hover:text-primary transition-all">{product.title}</h4>
          <span className=" text-primary font-semibold">
            {formatCurrency(product.price as number, 'NGN')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">x{product.quantity}</span>
          <MJActionGroupButton value={product.quantity} increment={increase} decrement={decrease} />
        </div>
      </div>
    </section>
  );
};

export default CartItemCard;
