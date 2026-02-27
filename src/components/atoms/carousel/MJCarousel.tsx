import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import type { MJAddToCartItem, MJCarouselDataItem } from '@/lib/types';

import '@mantine/carousel/styles.css';

import DishesCard from '@/components/molecules/cards/DishesCard';
import OrderDishCard from '@/components/molecules/cards/OrderDishCard';
import { useMealJetStore } from '@/lib/store/zustand.store';
import classes from '@/styles/css/Carousel.module.css';

type MJCarouselProps = {
  type: 'category' | 'image' | 'dishes' | 'order';
  height?: number;
  withIndicators?: boolean;
  withControls?: boolean;
  data: MJCarouselDataItem[];
  emblaOptions?: {
    loop: boolean;
    dragFree?: boolean;
    align?: 'center';
  };
  delay?: number;
  slideGap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  slideSize?: '100%' | '50%' | '33.333%' | '25%';
};

const MJCarousel = ({
  type,
  height,
  withIndicators,
  withControls,
  data,
  emblaOptions,
  delay = 1000,
  slideGap = 'md',
  slideSize = '100%',
}: MJCarouselProps) => {
  const autoplay = useRef(Autoplay({ delay }));
  const { cart, addToCart } = useMealJetStore((state) => state);

  const handleAddToCart = (id: string, product: MJAddToCartItem) => {
    addToCart(id, product);
  };
  return (
    <Carousel
      withIndicators={withIndicators}
      withControls={withControls}
      slideGap={slideGap}
      slideSize={slideSize}
      classNames={classes}
      height={height || 200}
      emblaOptions={emblaOptions}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
    >
      {data.map((item) => (
        <Carousel.Slide key={item.id}>
          <div className="w-full relative">
            {type === 'image' ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : type === 'category' ? (
              <div className="border border-gray-300 w-full rounded-lg p-6.5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full size-12.5 object-contain"
                />
                <div>
                  <h3 className="text-[13px] font-medium text-center">{item.title}</h3>
                  {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                </div>
              </div>
            ) : type === 'dishes' ? (
              <DishesCard
                item={item}
                handleAddToCart={handleAddToCart}
                isAddedToCart={cart.has(item.id)}
              />
            ) : (
              <OrderDishCard item={item} />
            )}
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default MJCarousel;
