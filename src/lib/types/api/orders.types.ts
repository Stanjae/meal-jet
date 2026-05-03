import type {
  orderTypes,
  PAYMENT_METHODS,
  PAYMENT_STATUSES,
  statusHistoryStates,
} from '@/lib/constants';
import type { UserType } from '../enums';
import type {
  IAddress,
  ICheckoutSummaryResponse,
  ILocation,
  MJAddToCartItem,
} from '../store.types';
import type { TGetApiResponse, TPostApiResponse } from './auth.types';

export type THandleCheckoutResponse = TPostApiResponse<ICheckoutSummaryResponse>;

export type IStatusHistory = {
  status: (typeof statusHistoryStates)[number];
  timestamp: Date;
  updatedBy: string; // user ID of who triggered the change
  note: string;
};

type TOrderVendorInfo = {
  _id: string;
  name: string;
  logo: string;
};

export type TOrder = {
  id?: string;
  orderNumber: string;
  checkoutSessionId: string;
  customer: string;
  vendor: TOrderVendorInfo;
  driver: string;
  status: (typeof statusHistoryStates)[number];
  deliveryFee: number;
  deliveryProof: string;
  estimatedDeliveryTime: Date | null;
  actualDeliveryTime: Date | null;
  driverRating: number | null;
  vendorRating: number | null;
  statusHistory: IStatusHistory[];
  items: MJAddToCartItem[];
  deliveryAddress: IAddress;
  deliveryLocation?: ILocation;
  subtotal: number; // sum of all vendor subtotals
  serviceFee: number;
  discount?: number;
  total: number;
  paymentMethod: (typeof PAYMENT_METHODS)[number];
  paymentStatus: (typeof PAYMENT_STATUSES)[number];
  paymentReference: string; // some payments might not have this
  refundAmount?: number;
  promoCode?: string;
  customerNotes?: string | null;
  orderType: (typeof orderTypes)[number];
  currency: string;
  cancelledBy?: UserType;
  cancellationReason?: string;
};

export type TGetOrderDetailsResponse = TGetApiResponse<{ orders: TOrder[] }>;
