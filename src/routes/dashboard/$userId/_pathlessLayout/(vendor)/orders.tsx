import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/$userId/_pathlessLayout/(vendor)/orders')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/$userId/(vendor)/orders"!</div>;
}
