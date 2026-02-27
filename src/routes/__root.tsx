import { createRootRoute, Outlet } from '@tanstack/react-router';
import { MantineProvider } from '@mantine/core';
//import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import '../styles/css/global.css';

import { Notifications } from '@mantine/notifications';
import { theme } from '@/styles/theme';

const RootLayout = () => (
  <MantineProvider theme={theme}>
    <Notifications position="top-right" />
    <Outlet />
  </MantineProvider>
);

export const Route = createRootRoute({ component: RootLayout });
