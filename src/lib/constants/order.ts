export enum statusHistoryStates {
  pending = 'pending',
  confirmed = 'confirmed',
  preparing = 'preparing',
  ready = 'ready',
  assigned = 'assigned',
  picked_up = 'picked_up',
  on_the_way = 'on_the_way',
  delivered = 'delivered',
  cancelled = 'cancelled',
  refunded = 'refunded',
}
export const orderTypes = ['delivery', 'pickup'] as const;

export const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'] as const;

export const PAYMENT_METHODS = ['wallet', 'card', 'paystack', 'ussd'] as const;

export const statusTimelineMessages: Record<
  statusHistoryStates,
  {
    title: string;
    description: string;
  }
> = {
  pending: {
    title: 'Order Placed',
    description: 'Your order has been received and is awaiting confirmation from the vendor.',
  },
  confirmed: {
    title: 'Order Confirmed',
    description: 'The vendor has confirmed your order and will begin preparing it shortly.',
  },
  preparing: {
    title: 'Preparing Your Order',
    description: 'The vendor is currently preparing your order. Hang tight!',
  },
  ready: {
    title: 'Order Ready',
    description: 'Your order is ready and waiting to be picked up by a rider.',
  },
  assigned: {
    title: 'Rider Assigned',
    description: 'A rider has been assigned to pick up and deliver your order.',
  },
  picked_up: {
    title: 'Order Picked Up',
    description: 'Your rider has picked up your order from the vendor.',
  },
  on_the_way: {
    title: 'On the Way',
    description: 'Your order is on its way! Your rider is heading to your location.',
  },
  delivered: {
    title: 'Order Delivered',
    description: 'Your order has been delivered. Enjoy your meal!',
  },
  cancelled: {
    title: 'Order Cancelled',
    description: 'Your order has been cancelled. Contact support if you have any concerns.',
  },
  refunded: {
    title: 'Refund Issued',
    description:
      'A refund has been issued for your order. It should reflect within 3–5 business days.',
  },
};

export const VENDOR_ORDER_REJECT_REASONS = [
  'Item(s) currently unavailable',
  'Restaurant too busy right now',
  'Incorrect address / undeliverable',
  'Payment issue',
  'Order placed in error',
  'Kitchen closed',
  'Others',
];
