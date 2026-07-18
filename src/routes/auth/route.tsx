import { createFileRoute } from '@tanstack/react-router';
import { checkAuthAuthRoute } from '@/lib/utils/middleware';

export const Route = createFileRoute('/auth')({
  beforeLoad: () => checkAuthAuthRoute(),
});
