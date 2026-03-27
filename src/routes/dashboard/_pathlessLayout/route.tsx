import { createFileRoute, Outlet } from '@tanstack/react-router';
import NotFoundComponent from '@/components/organisms/notfound/NotFoundComponent';
import { checkAuth } from '@/lib/utils/middleware';

export const Route = createFileRoute('/dashboard/_pathlessLayout')({
  beforeLoad: async () => {
    console.log('Running authentication check for dashboard layout99999');
    await checkAuth();
  },
  notFoundComponent: () => <NotFoundComponent errorType="404" />,
  component: () => <Outlet />,
});
