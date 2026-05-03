import { statusHistoryStates } from './order';

export type TStatusConfig = (typeof statusHistoryStates)[number];

export const statusConfig: Record<
  TStatusConfig,
  { color: string; variant: 'filled' | 'light' | 'outline' }
> = {
  pending: { color: 'orange', variant: 'filled' },
  confirmed: { color: 'blue', variant: 'filled' },
  preparing: { color: 'yellow', variant: 'filled' },
  ready: { color: 'green', variant: 'filled' },
  assigned: { color: 'violet', variant: 'filled' },
  picked_up: { color: 'cyan', variant: 'filled' },
  on_the_way: { color: 'indigo', variant: 'filled' },
  delivered: { color: 'teal', variant: 'filled' },
  cancelled: { color: 'red', variant: 'filled' },
  refunded: { color: 'gray', variant: 'filled' },
};
