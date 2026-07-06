import { createFileRoute, Link } from '@tanstack/react-router';
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
        return (
          <div className="space-y-3">
            <div className="font-bold text-gray-900">Rider Dashboard</div>
            <p className="text-sm text-gray-500">Manage live dispatch and delivery updates.</p>
            <Link
              to="/dashboard/$userId/my-deliveries"
              params={{ userId: user.id }}
              className="inline-flex items-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Open Dispatch Console
            </Link>
          </div>
        );
      default:
        return <div>Dashboard Layout</div>;
    }
  };
  return <div>{showRoleBasedContent()}</div>;
}
