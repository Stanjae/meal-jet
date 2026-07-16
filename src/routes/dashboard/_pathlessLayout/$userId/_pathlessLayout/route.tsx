import { useEffect } from 'react';
import { IconChevronDown, IconMapPin } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';
import { AppShell, Burger, Divider, Group, NavLink } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import MJLogo from '@/components/atoms/logo/MJLogo';
import AddUpdateLocationModal from '@/components/molecules/modals/AddUpdateLocationModal';
import DisplayAuthAvatar from '@/components/organisms/auth/DisplayAuthAvatar';
import NotFoundComponent from '@/components/organisms/notfound/NotFoundComponent';
import { ENDPOINTS } from '@/lib/api/clients';
import { multiRoleRoutes } from '@/lib/constants';
import socket from '@/lib/socket.io/socketConfig';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType } from '@/lib/types';

export const Route = createFileRoute('/dashboard/_pathlessLayout/$userId/_pathlessLayout')({
  component: RouteComponent,
  notFoundComponent: () => <NotFoundComponent errorType="404" />,
});

function RouteComponent() {
  const { user } = useMealJetStore((state) => state);
  const queryClient = useQueryClient();

  const [mobileOpened, { close: closeMobile, toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [locationWidgetOpened, { open: openLocationWidget, close: closeLocationWidget }] =
    useDisclosure(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navigation = multiRoleRoutes[user?.role as keyof typeof multiRoleRoutes] || [];

  const handleMainColor = () => {
    const pathSegments = pathname.split('/')[pathname.split('/').length - 1];
    if (pathSegments.includes('checkout')) {
      return 'bg-primary/5';
    }
    if (pathSegments === 'my-orders') {
      return 'bg-[radial-gradient(circle_at_12%_14%,rgba(252,146,58,0.23),transparent_36%),radial-gradient(circle_at_85%_2%,rgba(141,193,88,0.2),transparent_32%),linear-gradient(145deg,#fffdf8,#ffffff_45%,#f7fbef)] bg-no-repeat bg-cover';
    }
  };

  useEffect(() => {
    if (user?.role !== UserType.VENDOR) return;

    const onNewOrder = (payload: { orderNumber: string }) => {
      notifications.show({
        title: 'New incoming order',
        message: `Order ${payload.orderNumber} just arrived.`,
        color: 'orange',
      });

      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.getVendorOrders] });
    };

    socket.on('new_order', onNewOrder);

    return () => {
      socket.off('new_order', onNewOrder);
    };
  }, [queryClient, user?.role]);

  useEffect(() => {
    if (user?.role !== UserType.CUSTOMER) return;

    const onDeliveryUpdate = (payload: { orderNumber: string }) => {
      notifications.show({
        title: 'Order Update',
        message: `There's an update for order ${payload.orderNumber}.`,
        color: 'blue',
      });
    };
    socket.on('order_update_to_customer', onDeliveryUpdate);

    return () => {
      socket.off('order_update_to_customer', onDeliveryUpdate);
    };
  }, [user?.role]);

  const matches = useMediaQuery('(max-width: 480px)');

  const handleClickLink = () => {
    if (matches) {
      closeMobile();
      return;
    }
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header className="flex items-center justify-between pr-5">
        <Group className="flex-1" px="md">
          <MJLogo className=" hidden lg:block" />
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          {user?.role === UserType.CUSTOMER && (
            <section
              onClick={openLocationWidget}
              className="lg:flex hidden cursor-pointer w-full max-w-80 items-center border-x px-3 border-x-gray-200 gap-2"
            >
              <IconMapPin color="orange" />
              <div>
                <h4 className="uppercase hidden lg:inline-block text-xs font-semibold">
                  Delivery to
                </h4>
                <p title={user?.currentAddress?.formattedAddress} className="text-sm text-gray-600">
                  {user?.currentAddress?.formattedAddress.slice(0, 30) ||
                    'Select a delivery location'}
                  ...
                </p>
              </div>
              <IconChevronDown className="ml-auto" />
            </section>
          )}
        </Group>
        <DisplayAuthAvatar />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <section>
          {navigation.map((item) => {
            if (item.children && item.children?.length > 0) {
              const activeOpened = item.children.find((child) =>
                pathname.includes(
                  child.path === 'index'
                    ? item.path.replace('$userId', user?.id as string)
                    : child.path.replace('$userId', user?.id as string)
                )
              );
              return (
                <NavLink
                  label={item.label}
                  key={item.label}
                  className="rounded-md"
                  childrenOffset={10}
                  styles={{ label: { fontSize: 15, fontWeight: 600 } }}
                  leftSection={item.icon ? <item.icon size={16} /> : null}
                  component={Link}
                  defaultOpened={!!activeOpened}
                  to={item.path}
                  variant="filled"
                  active={pathname.includes(item.path)}
                >
                  {item.children.map((child) => {
                    const childPath = child.path === 'index' ? `${item.path}` : child.path;
                    return (
                      <NavLink
                        label={child.label}
                        onClick={handleClickLink}
                        renderRoot={(props) => (
                          <Link to={childPath} activeOptions={{ exact: true }} {...props} />
                        )}
                        key={child.label}
                        className="rounded-md"
                        styles={{ label: { fontSize: 14, fontWeight: 600 } }}
                      />
                    );
                  })}
                </NavLink>
              );
            }
            return (
              <NavLink
                label={item.label}
                onClick={handleClickLink}
                key={item.label}
                className="rounded-md"
                styles={{ label: { fontSize: 15, fontWeight: 600 } }}
                leftSection={item.icon ? <item.icon size={16} /> : null}
                renderRoot={(props) => (
                  <Link to={item.path} activeOptions={{ exact: true }} {...props} />
                )}
                variant="filled"
                active={pathname === item.path}
              />
            );
          })}
        </section>
        {user?.role === UserType.CUSTOMER && (
          <div className="lg:hidden mt-auto">
            <Divider my="sm" />
            <section
              onClick={openLocationWidget}
              className=" flex cursor-pointer w-full max-w-80 items-center px-3 border-x-gray-200 gap-2"
            >
              <IconMapPin color="orange" />
              <div>
                <h4 className="uppercase text-xs font-semibold">Delivery to</h4>
                <p title={user?.currentAddress?.formattedAddress} className="text-sm text-gray-600">
                  {user?.currentAddress?.formattedAddress.slice(0, 30) ||
                    'Select a delivery location'}
                  ...
                </p>
              </div>
              <IconChevronDown className="ml-auto" />
            </section>
          </div>
        )}
      </AppShell.Navbar>
      <AppShell.Main className={`${handleMainColor()} h-dvh overflow-y-auto`}>
        <Outlet />
      </AppShell.Main>
      <AddUpdateLocationModal opened={locationWidgetOpened} onClose={closeLocationWidget} />
    </AppShell>
  );
}
