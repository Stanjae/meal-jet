import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/$userId/_pathlessLayout/(drivers)/my-deliveries')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/$userId/_pathlessLayout/(drivers)/my-deliveries"!</div>;
}
