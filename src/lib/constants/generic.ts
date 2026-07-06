import { statusHistoryStates } from './order';

export const statusConfig: Record<
  statusHistoryStates,
  { color: string; variant: 'filled' | 'light' | 'outline' }
> = {
  pending: { color: 'orange', variant: 'filled' },
  confirmed: { color: 'blue', variant: 'filled' },
  preparing: { color: 'indigo', variant: 'filled' },
  ready: { color: 'green', variant: 'filled' },
  assigned: { color: 'violet', variant: 'filled' },
  picked_up: { color: 'cyan', variant: 'filled' },
  on_the_way: { color: 'yellow', variant: 'filled' },
  delivered: { color: 'teal', variant: 'filled' },
  cancelled: { color: 'red', variant: 'filled' },
  refunded: { color: 'gray', variant: 'filled' },
};
