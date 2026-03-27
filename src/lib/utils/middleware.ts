import { redirect } from '@tanstack/react-router';
import { notifications } from '@mantine/notifications';
import authClient from '../api/clients/auth';
import { useMealJetStore } from '../store/zustand.store';

// Used in the outer dashboard layout — only verifies auth, no role-based redirect.
export const checkAuth = async () => {
  const user = useMealJetStore.getState().user;

  if (!user) {
    try {
      const data = await authClient.isAuthenticated();
      useMealJetStore.getState().setUser(data?.data?.user);
    } catch {
      notifications.show({
        color: 'red',
        title: 'Redirecting to login page',
        message: 'Your session has expired. Please login again.',
        loading: true,
      });
      throw redirect({ to: '/auth/login' });
    }
  }
};

// Used only at the /dashboard index — redirects authenticated users to their role-specific page.
export const handleMiddleWare = async () => {
  const user = useMealJetStore.getState().user;

  if (!user) {
    try {
      const data = await authClient.isAuthenticated();
      const fetchedUser = data?.data?.user;

      useMealJetStore.getState().setUser(fetchedUser);

      if (fetchedUser) {
        redirectByRole(fetchedUser);
      }
    } catch {
      notifications.show({
        color: 'red',
        title: 'Redirecting to login page',
        message: 'Your session has expired. Please login again.',
        loading: true,
      });
      throw redirect({ to: '/auth/login' });
    }
  } else {
    redirectByRole(user);
  }
};

function redirectByRole(user: NonNullable<ReturnType<typeof useMealJetStore.getState>['user']>) {
  if (user.role === 'customer') {
    throw redirect({
      to: '/dashboard/$userId/explore',
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
}
