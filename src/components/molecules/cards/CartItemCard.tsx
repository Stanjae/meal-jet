import { IconPointFilled, IconTrash } from '@tabler/icons-react';
import { ActionIcon, List } from '@mantine/core';
import type { MJAddToCartItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

type Props = {
  product: MJAddToCartItem;
  increase?: () => void;
  decrease?: () => void;
  index?: number;
  id: string;
  deleteAction?: () => void;
};

const CartItemCard = ({ product, index, deleteAction }: Props) => {
  const customization = product.addons?.flatMap((addon) => {
    return (
      <div>
        <p className="text-sm font-medium">{addon.name}</p>
        <List spacing={'xs'} icon={<IconPointFilled size={10} />} size="xs">
          {addon.options
            .filter((option) => (option.quantity as number) > 0)
            .map((option) => (
              <List.Item key={option.label}>{option.label}</List.Item>
            ))}
        </List>
      </div>
    );
  });
  return (
    <div>
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-500">Pack {index !== undefined ? index + 1 : ''}</p>
        <ActionIcon size={'sm'} variant="light" color="red" onClick={deleteAction}>
          <IconTrash />
        </ActionIcon>
      </div>

      <section className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg">
        <div className="size-16.75 rounded-md border border-primary">
          <img className="w-full h-full" src={product.imageUrl} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className=" font-semibold hover:text-primary transition-all">{product.title}</h4>
            <span className=" text-primary font-semibold text-sm">
              {formatCurrency(product.price as number, 'NGN')}
            </span>
          </div>
          <div className="flex justify-between items-center">{customization}</div>
        </div>
      </section>
    </div>
  );
};

export default CartItemCard;
