import { createFileRoute } from '@tanstack/react-router';
import NotFoundComponent from '@/components/organisms/notfound/NotFoundComponent';
import { handleMiddleWare } from '@/lib/utils/middleware';

export const Route = createFileRoute('/dashboard/_pathlessLayout/')({
  beforeLoad: async () => {
    await handleMiddleWare();
  },
  notFoundComponent: () => <NotFoundComponent errorType="404" />,
});
