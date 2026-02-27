import { IconHeart, IconPointFilled } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import type { MJCarouselDataItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/helpers/helpers';

type DishesCardProps = {
  item: MJCarouselDataItem;
};

const OrderDishCard = ({ item }: DishesCardProps) => {
  return (
    <div className={`border border-gray-300 relative rounded-lg pb-6.5`}>
      <ActionIcon variant="subtle" className=" absolute right-5 top-5 rounded-full">
        <IconHeart />
      </ActionIcon>
      <img src={item.imageUrl} alt={item.title} className="mt-9 w-35 h-35 mx-auto block" />
      <div className=" px-3.5 space-y-1.5">
        <h4 className=" font-semibold text-[15px] text-center">{item.title}</h4>
        <p className=" text-xl font-bold text-primary text-center">
          {formatCurrency(item.price as number, 'NGN')}
        </p>
        <section className="flex justify-center gap-1 items-center text-xs text-gray-500">
          <span>{item.distance}</span>
          <IconPointFilled size={12} />
          <span>{item.duration}</span>
        </section>
      </div>
    </div>
  );
};

export default OrderDishCard;
