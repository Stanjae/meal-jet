/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomId } from '@mantine/hooks';
import { ApplicationCharges, UserType } from '../types';
import type { FullRestaurantData, SignupFormData } from '../utils/schema';

export const genericFields = {
  email: '',
  password: '',
};

export const signUpDefaultValuesCustomer: SignupFormData = {
  ...genericFields,
  username: '',
  role: UserType.CUSTOMER,
};

export const loginDefaultValues = genericFields;

// ─────────────────────────────────────────
// INITIAL VALUES
// Must match the full schema shape exactly.
// Mantine needs all fields pre-declared.
// ─────────────────────────────────────────
export const initialVendorOnboardingValues: FullRestaurantData = {
  // Step 1
  name: '',
  description: '',
  cuisineTypes: [],
  tags: [],
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    type: 'Point',
    coordinates: [0, 0],
  },
  logo: undefined,
  coverImage: undefined,

  // Step 3
  openingHours: [
    { day: '0', isClosed: false, openTime: '08:00', closeTime: '22:00' },
    { day: '1', isClosed: false, openTime: '08:00', closeTime: '22:00' },
    { day: '2', isClosed: false, openTime: '08:00', closeTime: '22:00' },
    { day: '3', isClosed: false, openTime: '08:00', closeTime: '22:00' },
    { day: '4', isClosed: false, openTime: '08:00', closeTime: '22:00' },
    { day: '5', isClosed: false, openTime: '08:00', closeTime: '22:00' },
    { day: '6', isClosed: true, openTime: '', closeTime: '' },
  ],

  // Step 4
  avgPrepTime: 30,
  minOrderAmount: 0,
  baseDeliveryFee: 0,
  commissionRate: ApplicationCharges.COMMISSION_RATE * 100, // Store as percentage (e.g. 17 for 17%)

  // Step 5
  proof_of_registration: undefined,
  proof_of_identification: undefined,

  // Step 6
  bankDetails: {
    bankName: '',
    accountNumber: '',
    accountName: '',
    bankCode: '',
  },

  // Extras
  status: 'pending_approval',
  isOpen: false,
  isFeatured: false,
};

export const initialMenuItemValues = {
  vendor: '',
  name: '',
  category: '',
  description: '',
  price: 0,
  discountPrice: 0,
  prepTime: 0,
  isAvailable: true,
  isPopular: false,
  isFeatured: false,
  calories: 0,
  allergens: [],
  tags: [],
  addons: [
    {
      name: '',
      options: [{ label: '', extraPrice: 0, isAvailable: true }],
      required: true,
      maxSelect: 0,
      minSelect: 1,
      key: randomId(),
    },
  ],
  image: undefined as any,
  images: [],
};

export const initialEditMenuItemValues = {
  vendor: '',
  name: '',
  category: '',
  description: '',
  price: 0,
  discountPrice: 0,
  prepTime: 0,
  isAvailable: true,
  isPopular: false,
  isFeatured: false,
  calories: 0,
  allergens: [],
  tags: [],
  addons: [
    {
      name: '',
      options: [{ label: '', extraPrice: 0, isAvailable: true }],
      required: true,
      maxSelect: 0,
      minSelect: 1,
      key: randomId(),
    },
  ],
  image: '' as any,
  images: [],
};

/* export interface IAddonOption {
  label: string;
  extraPrice: number;
  isAvailable: boolean;
}

export interface IAddon {
  name: string;
  options: IAddonOption[];
  required: boolean;
  maxSelect: number;
  minSelect: number;
}

export interface IMenuItem extends Document {
  vendor: Types.ObjectId;
  price: number;
  discountPrice?: number;
  image: string;
  images: string[];
  isAvailable: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  prepTime: number;
  calories?: number;
  allergens: string[];
  addons: IAddon[];
  tags: string[];
  orderCount: number;
} */
