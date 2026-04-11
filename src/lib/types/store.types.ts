import type { IAddon } from './api';
import type { UserType } from './enums';

export type AuthProvider = 'local' | 'google';

export type UserStatus = 'active' | 'suspended' | 'pending_verification' | 'banned';

export type IAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  formattedAddress: string;
  coordinates: { lat: number; lng: number };
  _id?: string;
};

export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

export type IUser = {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role: UserType;
  status: UserStatus;
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  authProvider: AuthProvider;
  googleId?: string;
  savedAddresses: IAddress[];
  currentAddress?: IAddress;
  walletBalance: number;
  fcmToken?: string;
  lastLogin?: Date;
  relatedEntityStatus: 'approved' | 'in-review' | 'pending';
  vendorCount: number;
  location: ILocation;
};

export type MJAddToCartItem = {
  title: string;
  id: string;
  quantity: number;
  price: number;
  imageUrl: string;
  totalQuantity: number;
  addons?: IAddon[];
  vendorId: string;
  vendorName: string;
  vendorImage: string;
  vendorSlug: string;
  vendorLocation: ILocation;
  vendorDeliveryFee: number;
};

export type ICheckoutSummary = {
  vendorId: string;
  vendorImage: string;
  vendorName: string;
  vendorSlug: string;
  vendorDeliveryFee: number;
  vendorLocation: ILocation;
  calculatedDistanceKm: string;
  calculatedSubtotal: number;
  items: MJAddToCartItem[];
  total: number;
  serviceCharge: number;
};

export type ICheckoutSummaryResponse = {
  summary: {
    newCart: ICheckoutSummary[];
    grandTotal: number;
    totalServiceCharge: number;
    totalSubtotal: number;
    totalDeliveryFee: number;
  };
  checkoutSessionId: string;
};

export type MJAddtoCart = { [key: string]: MJAddToCartItem };
