import { createFileRoute, redirect } from '@tanstack/react-router';
import { useMealJetStore } from '@/lib/store/zustand.store';

export const Route = createFileRoute('/auth')({
  beforeLoad: () => {
    const user = useMealJetStore.getState().user;

    if (user) {
      throw redirect({ to: '/dashboard/' + user.id });
    }
  },
});
