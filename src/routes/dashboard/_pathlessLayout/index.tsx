import { createFileRoute } from '@tanstack/react-router';
import NotFoundComponent from '@/components/organisms/notfound/NotFoundComponent';
import { handleMiddleWare } from '@/lib/utils/middleware';

export const Route = createFileRoute('/dashboard/_pathlessLayout/')({
  beforeLoad: async () => {
    console.log('Running authentication middleware for dashboard layout');
    await handleMiddleWare();
  },
  notFoundComponent: () => <NotFoundComponent errorType="404" />,
});
