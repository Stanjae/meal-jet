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
  status: statusHistoryStates;
  timestamp: Date | string;
  updatedBy: string; // user ID of who triggered the change
  updatedByUserRole: UserType; // optional, user role of who triggered the change
};

type TOrderVendorInfo = {
  _id: string;
  name: string;
  logo: string;
  slug: string;
};

export type TOrder = {
  id?: string;
  orderNumber: string;
  checkoutSessionId: string;
  customer: string;
  vendor: TOrderVendorInfo;
  driver: string;
  status: statusHistoryStates;
  actualPrepTime: number | null;
  prepTimeEstimate: number | null;
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
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type TAllVendorOrders = {
  id?: string;
  orderNumber: string;
  checkoutSessionId: string;
  customer: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  vendor: TOrderVendorInfo;
  driver: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    vehicle_type: string;
  };
  status: statusHistoryStates;
  dispatchExhausted?: boolean;
  dispatchProgress?: {
    orderId: string;
    currentRound: number;
    totalRounds: number;
    batchSize: number;
    radiusMetres: number;
    startedAt: number;
    expiresAt: number;
    waitMs: number;
  } | null;
  actualPrepTime: number | null;
  prepTimeEstimate: number | null;
  deliveryFee: number;
  deliveryProof: string;
  estimatedDeliveryTime: string | null;
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
  customerNotes?: string | null;
  orderType: (typeof orderTypes)[number];
  currency: string;
  cancelledBy?: UserType;
  cancellationReason?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type TGetOrderDetailsResponse = TGetApiResponse<{
  orders: TOrder[];
  totalDeliveryFee: number;
  totalServiceFee: number;
  grandTotal: number;
  paymentType: (typeof PAYMENT_METHODS)[number];
  deliveryAddress: string;
  checkoutId: string;
}>;

export type TGetOrderDetailsByIdResponse = TGetApiResponse<{
  order: TOrder;
}>;

export type TGetAllVendorOrdersResponse = TGetApiResponse<{
  orders: TAllVendorOrders[];
}>;

export type TGetAllVendorOrdersParams = {
  vendorId: string;
  createdAt?: Date | string;
};

export type TUpdateOrderStatusPayload = {
  status: statusHistoryStates;
  statusTimeline: IStatusHistory[];
  cancelledBy?: UserType;
  cancellationReason?: string | null;
  actualPrepTime?: number;
  prepTimeEstimate?: number;
  cancelledByUserId?: string; // optional, user ID of who triggered the change
};

export type TUpdateOrderStatusResponse = TPostApiResponse<{
  order: TOrder;
}>;

export type TVendorRetryDispatchResponse = TPostApiResponse<{
  orderId: string;
  retryCount: number;
  cooldownSeconds: number;
}>;

export type TRiderUpdateDeliveryStatusPayload = {
  status:
    | statusHistoryStates.picked_up
    | statusHistoryStates.on_the_way
    | statusHistoryStates.delivered;
};

export type TRiderAcceptDispatchResponse = TPostApiResponse<{
  order: TOrder;
}>;

export type TRiderUpdateDeliveryStatusResponse = TPostApiResponse<{
  order: TOrder;
}>;

export type TGetAllCustomerOrdersResponse = TGetApiResponse<{
  orders: TOrder[];
}>;

export type TGetAllCustomerOrdersSummaryResponse = TGetApiResponse<{
  summary: {
    ongoing: number;
    completed: number;
    allCount: number;
    delivered: number;
  };
  totalAmountSpent: number;
  averageAmountPerOrder: number;
}>;

export type TGetAllCustomerOrdersQueryParams = {
  search?: string;
  category?: string;
};

export type TRevalidateCheckoutSessionResponse = {
  order: TOrder;
  cartErrors: string[];
  cartDetailedErrors: { itemId: string; message: string; type: 'item' | 'vendor' }[]; // replace `any` with the appropriate type if available
};

export type THandleRevalidateCheckoutResponse = TGetApiResponse<TRevalidateCheckoutSessionResponse>;
