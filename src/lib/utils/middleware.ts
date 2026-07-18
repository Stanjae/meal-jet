import { redirect } from '@tanstack/react-router';
import { notifications } from '@mantine/notifications';
import authClient from '../api/clients/auth';
import socket from '../socket.io/socketConfig';
import { useMealJetStore } from '../store/zustand.store';
import { UserType } from '../types';

function initializeWebSockets(userId: string) {
  socket.on('connect', () => {
    socket.emit('register', userId);
  });
}

// Used in the outer dashboard layout — only verifies auth, no role-based redirect.
export const checkAuth = async () => {
  const user = useMealJetStore.getState().user;
  const vendorProfile = useMealJetStore.getState().vendor;
  initializeWebSockets(
    user?.role === UserType.VENDOR ? (vendorProfile?.id as string) : (user?.id as string)
  );
  if (!user) {
    try {
      const data = await authClient.isAuthenticated();
      const newUser = data?.data?.user;
      useMealJetStore.getState().setUser(newUser);
      initializeWebSockets(
        newUser?.role === UserType.VENDOR ? (vendorProfile?.id as string) : (newUser?.id as string)
      );
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
  if (user) {
    redirectByRole(user);
  }
};

function redirectByRole(user: NonNullable<ReturnType<typeof useMealJetStore.getState>['user']>) {
  switch (user.role) {
    case UserType.CUSTOMER:
      throw redirect({
        to: '/dashboard/$userId',
        params: { userId: user.id },
      });
    case UserType.VENDOR:
      if (user.hasProfile) {
        throw redirect({
          to: '/dashboard/select-store',
        });
      } else {
        throw redirect({
          to: '/dashboard/onboarding',
          params: { userId: user.id },
        });
      }

    case UserType.RIDER:
      if (user.hasProfile) {
        throw redirect({
          to: '/dashboard/$userId',
          params: { userId: user.id },
        });
      } else {
        throw redirect({
          to: '/dashboard/onboarding',
        });
      }
    case UserType.ADMIN:
      throw redirect({
        to: '/admin-dashboard/home',
      });
    default:
      throw redirect({ to: '/auth/login' });
  }
}

///for the /auth route, we will check if the user is authenticated and redirect them to their respective dashboard based on their role. If the user is not authenticated, they will be allowed to access the /auth route.
export const checkAuthAuthRoute = () => {
  const user = useMealJetStore.getState().user;

  if (user) {
    redirectByRole(user);
  }

  /*  if (isRedirect(e)) {
        throw e; // let the router actually perform the redirect
      }
      console.error('User is not authenticated, allowing access to /auth route', e); */
};
