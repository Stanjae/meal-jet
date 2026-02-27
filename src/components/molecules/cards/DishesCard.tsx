import { IconCheck, IconHeart, IconPlus } from '@tabler/icons-react';
import { ActionIcon, Badge, Rating } from '@mantine/core';
import type { MJAddToCartItem, MJCarouselDataItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

type DishesCardProps = {
  item: MJCarouselDataItem;
  handleAddToCart: (id: string, product: MJAddToCartItem) => void;
  isAddedToCart?: boolean;
};

const DishesCard = ({ item, handleAddToCart, isAddedToCart }: DishesCardProps) => {
  return (
    <div className={`border border-gray-300 relative rounded-lg pb-6.5`}>
      <Badge
        color={item.status === 'discount' ? 'red' : 'm-orange'}
        variant="filled"
        className=" absolute left-0 top-0 rounded-tr-none rounded-l-none"
      >
        {item.statusText}
      </Badge>
      <ActionIcon variant="subtle" className=" absolute right-5 top-5 rounded-full">
        <IconHeart />
      </ActionIcon>
      <img src={item.imageUrl} alt={item.title} className="mt-9 w-48.25 h-31.75 mx-auto block" />
      <div className=" px-3.5 space-y-1.5">
        <Rating defaultValue={2} />
        <h4 className=" font-semibold text-[15px]">{item.title}</h4>
        <section className="flex justify-between items-center">
          <span className=" text-xl font-bold text-primary">
            {formatCurrency(item.price as number, 'NGN')}
          </span>
          <ActionIcon
            color={isAddedToCart ? 'm-green' : 'm-orange'}
            onClick={() =>
              handleAddToCart(item.id, {
                imageUrl: item.imageUrl as string,
                title: item.title as string,
                quantity: 1,
                price: item.price as number,
                totalQuantity: item.totalQuantity as number,
              })
            }
          >
            {isAddedToCart ? <IconCheck /> : <IconPlus />}
          </ActionIcon>
        </section>
      </div>
    </div>
  );
};

export default DishesCard;
