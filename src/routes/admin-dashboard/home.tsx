import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin-dashboard/home')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin-dashboard/home"!</div>;
}
