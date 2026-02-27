import { createFileRoute, redirect } from '@tanstack/react-router';
import { useMealJetStore } from '@/lib/store/zustand.store';

export const Route = createFileRoute('/dashboard/$userId/_pathlessLayout/')({
  beforeLoad: () => {
    const user = useMealJetStore.getState().user;

    if (!user) {
      throw redirect({ to: '/auth/login' });
    }

    // Redirect to role-specific default page
    if (user.role === 'customer') {
      throw redirect({
        to: '/dashboard/$userId/my-orders',
        params: { userId: user.id },
      });
    }

    if (user.role === 'vendor') {
      throw redirect({
        to: '/dashboard/$userId/orders',
        params: { userId: user.id },
      });
    }

    if (user.role === 'driver') {
      throw redirect({
        to: '/dashboard/$userId/my-deliveries',
        params: { userId: user.id },
      });
    }

    // Fallback
    throw redirect({ to: '/' });
  },
});
