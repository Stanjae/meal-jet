import { createFileRoute } from '@tanstack/react-router';
import { useMealJetStore } from '@/lib/store/zustand.store';

export const Route = createFileRoute('/dashboard/_pathlessLayout/$userId/_pathlessLayout/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useMealJetStore((state) => state);

  const showRoleBasedContent = () => {
    switch (user?.role) {
      case 'customer':
        return <div>Customer Dashboard</div>;
      case 'vendor':
        return <div>Vendor Dashboard</div>;
      case 'rider':
        return <div>Rider Dashboard</div>;
      default:
        return <div>Dashboard Layout</div>;
    }
  };
  return <div>{showRoleBasedContent()}</div>;
}
