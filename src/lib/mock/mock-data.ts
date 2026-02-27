import Chicken from '@/assets/chicken-leg.png';
import Cooking from '@/assets/cooking.png';
import Bakery from '@/assets/cupcake.png';
// Mock data for dishes
import Dish1 from '@/assets/dishes/burgerA.jpg';
import Dish2 from '@/assets/dishes/burgerB.jpg';
import Dish3 from '@/assets/dishes/burgerC.jpg';
// Mock data for recent orders
import Order1 from '@/assets/dishes/pizzaA.jpg';
import Order2 from '@/assets/dishes/ramen.jpg';
import Order3 from '@/assets/dishes/rice.jpg';
import Snacks from '@/assets/hamburger2.png';
import Image1 from '@/assets/pic-1-DpLzDiYw.jpg';
import Image2 from '@/assets/pic-3-CmbyQfEk.jpg';
import Image3 from '@/assets/pic-4-ECaBLxLs.jpg';
import type { MJAddtoCart, MJCarouselDataItem } from '../types';

export const mockFeaturedEvents: MJCarouselDataItem[] = [
  {
    id: '1',
    title: 'Food Festival',
    description:
      'Join us for a day of delicious food and fun activities at our annual food festival!',
    imageUrl: Image1,
  },
  {
    id: '2',
    title: 'Art Exhibition',
    description: 'Experience the vibrant world of art at our annual art exhibition!',
    imageUrl: Image2,
  },
  {
    id: '3',
    title: 'Music Concert',
    description: 'Join us for a night of live music and entertainment at our annual music concert!',
    imageUrl: Image3,
  },
];

export const mockCategories: MJCarouselDataItem[] = [
  {
    id: '1',
    title: 'Food Festival',
    imageUrl: Chicken,
  },
  {
    id: '2',
    title: 'Art Exhibition',
    imageUrl: Cooking,
  },
  {
    id: '3',
    title: 'Music Concert',
    imageUrl: Bakery,
  },
  {
    id: '4',
    title: 'Music Concert',
    imageUrl: Snacks,
  },
];

export const mockDishes: MJCarouselDataItem[] = [
  {
    id: '1',
    title: 'Food Festival',
    description:
      'Join us for a day of delicious food and fun activities at our annual food festival!',
    imageUrl: Dish1,
    status: 'discount',
    statusText: '20% OFF',
    price: 5500,
    totalQuantity: 10,
  },
  {
    id: '2',
    title: 'Burger B',
    description: 'Delicious burger with fresh ingredients and special sauce!',
    imageUrl: Dish2,
    status: 'exclusive',
    statusText: 'Exclusive',
    price: 5000,
    totalQuantity: 10,
  },
  {
    id: '3',
    title: 'Burger C',
    description: 'Juicy burger with premium beef and cheese!',
    imageUrl: Dish3,
    status: 'discount',
    statusText: '15% OFF',
    price: 6000,
    totalQuantity: 10,
  },
  {
    id: '4',
    title: 'Food Festival',
    description:
      'Join us for a day of delicious food and fun activities at our annual food festival!',
    imageUrl: Dish1,
    status: 'discount',
    statusText: '20% OFF',
    price: 8900,
    totalQuantity: 10,
  },
];

export const mockRecentOrders: MJCarouselDataItem[] = [
  {
    id: '1',
    title: 'Fried Rice',
    distance: '4.75km',
    duration: '30min',
    imageUrl: Order1,
    price: 5500,
  },
  {
    id: '2',
    title: 'Burger B',
    distance: '4.75km',
    duration: '30min',
    imageUrl: Order2,
    price: 5000,
  },
  {
    id: '3',
    title: 'Burger C',
    distance: '4.75km',
    duration: '30min',
    imageUrl: Order3,
    price: 6000,
  },
  {
    id: '4',
    title: 'Food Festival',
    distance: '4.75km',
    duration: '30min',
    imageUrl: Order1,
    price: 8900,
  },
];

export const mockAddToCart: MJAddtoCart = {
  '1': {
    title: 'Fried Rice',
    quantity: 1,
    totalQuantity: 12,
    imageUrl: Order1,
    price: 5500,
  },
  '2': {
    title: 'Burger B',
    quantity: 1,
    totalQuantity: 12,
    imageUrl: Order2,
    price: 5000,
  },
  '3': {
    title: 'Burger C',
    quantity: 1,
    totalQuantity: 12,
    imageUrl: Order3,
    price: 6000,
  },
  '4': {
    title: 'Food Festival',
    quantity: 1,
    totalQuantity: 12,
    imageUrl: Order1,
    price: 8900,
  },
};
