import type { TGetApiResponse, TPostApiResponse } from './auth.types';

export type TCreateVendorResponse = TPostApiResponse<{
  message: string;
}>;

export type TGetProfileCountResponse = TGetApiResponse<{
  count: number;
}>;

export interface IOpeningHour {
  day: string; // 0 = Sunday, 6 = Saturday
  openTime: string; // "08:00"
  closeTime: string; // "22:00"
  isClosed: boolean;
}

export type VendorAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
};

export type IBankDetails = {
  bankName: string;
  bankCode?: string;
  accountNumber: string;
  accountName: string;
};

export type ILocation = {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
};

export type IVendorStatus = 'pending_approval' | 'active' | 'suspended' | 'closed';

export interface IVendor {
  owner: string;
  name: string;
  slug: string;
  description: string;
  cuisineTypes: string[];
  status: IVendorStatus;
  isOpen: boolean;
  logo: string;
  coverImage: string;
  address: VendorAddress;
  location: ILocation;
  phone: string;
  openingHours: IOpeningHour[];
  avgRating: number;
  totalRatings: number;
  avgPrepTime: number;
  minOrderAmount: number;
  deliveryFee: number;
  commissionRate: number;
  bankDetails: IBankDetails;
  totalOrders: number;
  isFeatured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  proof_of_registration: string;
  proof_of_identification: string;
  id: string;
}

export type TGetVendorProfilesResponse = TGetApiResponse<{
  vendors: IVendor[];
}>;
