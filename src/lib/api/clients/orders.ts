import type {
  MJAddToCartItem,
  TGetAllCustomerOrdersQueryParams,
  TGetAllCustomerOrdersResponse,
  TGetAllCustomerOrdersSummaryResponse,
  TGetAllVendorOrdersParams,
  TGetAllVendorOrdersResponse,
  TGetOrderDetailsByIdResponse,
  TGetOrderDetailsResponse,
  THandleCheckoutResponse,
  THandleRevalidateCheckoutResponse,
  TRiderAcceptDispatchResponse,
  TRiderUpdateDeliveryStatusPayload,
  TRiderUpdateDeliveryStatusResponse,
  TUpdateOrderStatusPayload,
  TUpdateOrderStatusResponse,
  TVendorRetryDispatchResponse,
} from '@/lib/types';
import Client from '../axiosInstance';
import { ENDPOINTS } from './endpoints';

const ordersClient = {
  /**
   * Description - validate cart, calculates fees per vendor, generates checkoutSessionId, caches summary in Redis (15 mins)
   * @param {MJAddToCartItem[]} payload - Array of items to checkout.
   * @returns summary to frontend
   * @throws {Error} If the request fails.
   */
  handleCheckout: async (payload: MJAddToCartItem[]) => {
    return await Client.post<THandleCheckoutResponse>(
      ENDPOINTS.checkout,
      JSON.stringify({ payload }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },

  /**
   * Description - fetches order details for a given checkout session after successful payment
   * @param {string} checkoutId - ID of the checkout session to fetch details for.
   * @returns order details for the given checkout session
   * @throws {Error} If the request fails.
   */
  getOrderDetails: async (checkoutId: string) => {
    return await Client.get<TGetOrderDetailsResponse>(`${ENDPOINTS.getOrderDetails}/${checkoutId}`);
  },

  /**
   * Description - fetches order details for a given orderId
   * @param {string} orderId - ID of the order to fetch details for.
   * @returns order details for the given orderId
   * @throws {Error} If the request fails.
   */
  getOrderDetailsById: async (orderId: string) => {
    return await Client.get<TGetOrderDetailsByIdResponse>(
      `${ENDPOINTS.getOrderDetailsById}/${orderId}`
    );
  },

  /**
   * Description - fetches all orders assigned to a vendor
   * @param {string} vendorId - ID of the vendor to fetch orders for.
   * @returns array of all orders
   * @throws {Error} If the request fails.
   */
  getVendorOrders: async ({ vendorId, ...params }: TGetAllVendorOrdersParams) => {
    return await Client.get<TGetAllVendorOrdersResponse>(
      `${ENDPOINTS.getVendorOrders}/${vendorId}`,
      { params }
    );
  },

  /**
   * Description - updates the status of an order by id
   * @param {string} orderId - ID of the order to update.
   * @param { TUpdateOrderStatusPayload} payload - The order update payload.
   * @returns updated order details
   * @throws {Error} If the request fails.
   */
  updateOrderStatus: async ({
    orderId,
    payload,
  }: {
    orderId: string;
    payload: TUpdateOrderStatusPayload;
  }) => {
    return await Client.patch<TUpdateOrderStatusResponse>(
      `${ENDPOINTS.updateOrderStatus}/${orderId}/status`,
      payload
    );
  },

  /**
   * Description - vendor retries rider dispatch for a ready and unassigned order.
   * @param {string} orderId - ID of the order to retry dispatch for.
   * @returns retry count and cooldown seconds
   * @throws {Error} If the request fails.
   */
  vendorRetryDispatch: async ({ orderId }: { orderId: string }) => {
    return await Client.patch<TVendorRetryDispatchResponse>(
      `${ENDPOINTS.vendorRetryDispatch}/${orderId}`
    );
  },

  /**
   * Description - rider accepts a dispatch offer for an order.
   * @param {string} orderId - ID of the order to accept dispatch for.
   * @returns order details for the accepted dispatch
   * @throws {Error} If the request fails.
   */
  riderAcceptDispatch: async ({ orderId }: { orderId: string }) => {
    return await Client.patch<TRiderAcceptDispatchResponse>(
      `${ENDPOINTS.riderAcceptDispatch}/${orderId}`
    );
  },

  /**
   * Description - rider updates in-delivery order status.
   * @param {string} orderId - ID of the order to update delivery status for.
   * @param {TRiderUpdateDeliveryStatusPayload} payload - The delivery status update payload.
   * @returns updated order details
   * @throws {Error} If the request fails.
   */
  riderUpdateDeliveryStatus: async ({
    orderId,
    payload,
  }: {
    orderId: string;
    payload: TRiderUpdateDeliveryStatusPayload;
  }) => {
    return await Client.patch<TRiderUpdateDeliveryStatusResponse>(
      `${ENDPOINTS.riderUpdateDeliveryStatus}/${orderId}`,
      payload
    );
  },

  /**
   * Description - fetches all orders for a customer
   * @returns array of all orders for the customer
   * @throws {Error} If the request fails.
   */
  getCustomerOrders: async (query?: TGetAllCustomerOrdersQueryParams) => {
    return await Client.get<TGetAllCustomerOrdersResponse>(ENDPOINTS.getCustomerOrders, {
      params: query,
    });
  },

  /**
   * Description - fetches summary of all orders for a customer
   * @returns summary of all orders for the customer
   * @throws {Error} If the request fails.
   */
  getCustomerOrdersSummary: async () => {
    return await Client.get<TGetAllCustomerOrdersSummaryResponse>(
      ENDPOINTS.getCustomerOrdersSummary
    );
  },

  /**
   * Description - revalidates the checkout session for a given orderId and returns the updated summary
   * @param {string} orderId - ID of the order to revalidate checkout session for.
   * @returns updated summary for the given orderId
   * @throws {Error} If the request fails.
   */
  revalidateCheckoutSession: async (orderId: string) => {
    return await Client.get<THandleRevalidateCheckoutResponse>(
      `${ENDPOINTS.revalidateCheckoutSession}/${orderId}`
    );
  },
};

export default ordersClient;
