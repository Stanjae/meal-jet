import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/track-orders/$checkoutId'
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello
      "/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/track-orders/$checkoutId"!
    </div>
  );
}
