import type { UserType } from './enums';

export type AuthProvider = 'local' | 'google';

export type UserStatus = 'active' | 'suspended' | 'pending_verification' | 'banned';

export interface IAddress {
  label: string; // 'Home', 'Work', etc.
  street: string;
  city: string;
  state: string;
  country: string;
  coordinates: { lat: number; lng: number };
}

export interface IUser {
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
  walletBalance: number;
  fcmToken?: string;
  lastLogin?: Date;
}

export type MJAddToCartItem = {
  title: string;
  quantity: number;
  price: number;
  imageUrl: string;
  totalQuantity: number;
};

export type MJAddtoCart = { [key: string]: MJAddToCartItem };
