import { createFileRoute } from '@tanstack/react-router';
import { UserType } from '@/lib/types';
import { requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/my-orders'
)({
  component: RouteComponent,
  beforeLoad: () => requireRole([UserType.CUSTOMER]),
});

function RouteComponent() {
  return <div>Hello "/dashboard/$userId/my-orders"!</div>;
}
