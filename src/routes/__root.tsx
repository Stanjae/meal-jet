import { MantineProvider } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import '../styles/css/global.css'
import { theme } from "@/styles/theme";


const RootLayout = () => (
  <>
    <MantineProvider theme={theme}>
      <Outlet />
    </MantineProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
