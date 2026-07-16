import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, type CarouselProps } from '@mantine/carousel';

import '@mantine/carousel/styles.css';

import classes from '@/styles/css/Carousel.module.css';

type MJCarouselProps = CarouselProps & {
  children: React.ReactNode;
  delay?: number;
};

const MJCarousel = ({ children, delay, ...carouselProps }: MJCarouselProps) => {
  const autoplay = useRef(Autoplay({ delay: delay || 3000 }));
  return (
    <Carousel
      classNames={classes}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
      {...carouselProps}
    >
      {children}
    </Carousel>
  );
};

export default MJCarousel;
