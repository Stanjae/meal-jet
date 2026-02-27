import { createFileRoute } from '@tanstack/react-router';
import { requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute('/dashboard/$userId/_pathlessLayout/(customer)/my-orders')({
  component: RouteComponent,
  beforeLoad: () => requireRole('customer'),
});

function RouteComponent() {
  return <div>Hello "/dashboard/$userId/my-orders"!</div>;
}
