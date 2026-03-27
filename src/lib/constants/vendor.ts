import type { MJSelectOption } from '../types';
import { newDayJs } from '../utils/helpers/helpers';

export const CUISINE_TYPES = [
  // African
  'Nigerian',
  'Ghanaian',
  'Ethiopian',
  'South African',

  // Continental / Western
  'Continental',
  'Italian',
  'French',
  'Mediterranean',
  'American',

  // Asian
  'Chinese',
  'Indian',
  'Japanese',
  'Thai',
  'Korean',

  // Middle Eastern
  'Lebanese',
  'Turkish',
  'Arabic',

  // Popular categories
  'Fast Food',
  'Grills & BBQ',
  'Shawarma',
  'Pizza',
  'Burgers',
  'Seafood',
  'Soups & Stews',
  'Salads',
  'Desserts & Pastries',
  'Smoothies & Drinks',
] as const;

export type CuisineType = (typeof CUISINE_TYPES)[number];

export const RESTAURANT_TAGS = [
  'halal',
  'vegan',
  'vegetarian',
  'fast-delivery',
  'kosher',
  'gluten-free',
  'organic',
];

export const DAYS = Array.from({ length: 7 }, (_, i) => ({
  value: i.toString(),
  label: newDayJs().day(i).format('dddd'),
}));

export const vendorStatus = ['pending_approval', 'active', 'suspended', 'closed'];

export const ModifiedCuisineTypes: MJSelectOption[] = CUISINE_TYPES.map((cuisine) => ({
  value: cuisine.toLowerCase(),
  label: cuisine,
}));

export const ModifiedRestaurantTags: MJSelectOption[] = RESTAURANT_TAGS.map((tag) => ({
  value: tag.toLowerCase(),
  label: tag.charAt(0).toUpperCase() + tag.slice(1),
}));

export const VENDOR_STATUS_CONFIG = {
  pending_approval: {
    label: 'Pending Approval',
    color: '#F59E0B', // amber
    background: '#FEF3C7', // amber light
  },
  active: {
    label: 'Active',
    color: '#10B981', // green
    background: '#D1FAE5', // green light
  },
  suspended: {
    label: 'Suspended',
    color: '#EF4444', // red
    background: '#FEE2E2', // red light
  },
  closed: {
    label: 'Closed',
    color: '#6B7280', // gray
    background: '#F3F4F6', // gray light
  },
} as const;
