import { createFileRoute } from '@tanstack/react-router';
import { handleMiddleWare } from '@/lib/utils/middleware';

export const Route = createFileRoute('/dashboard/_pathlessLayout/$userId/_pathlessLayout/')({
  beforeLoad: async () => {
    await handleMiddleWare();
  },
});
