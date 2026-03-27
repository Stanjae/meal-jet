import { createFileRoute, Link, Outlet, redirect, useRouterState } from '@tanstack/react-router';
import { AppShell, Avatar, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJLogo from '@/components/atoms/logo/MJLogo';
import MJAvatarDropdown from '@/components/molecules/dropdowns/MJDropdown';
import VendorDropdown from '@/components/molecules/dropdowns/VendorDropdown';
import AddtoCart from '@/components/organisms/cart/AddtoCart';
import NotFoundComponent from '@/components/organisms/notfound/NotFoundComponent';
import { dasboardDropdownOptions, multiRoleRoutes } from '@/lib/constants';
import { useAuth } from '@/lib/hooks';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType } from '@/lib/types';
import { requireAuth } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute('/dashboard/_pathlessLayout/$userId/_pathlessLayout')({
  component: RouteComponent,
  beforeLoad: ({ params }) => {
    const { user } = requireAuth();

    // Verify userId in URL matches current user
    if (user.id !== params.userId) {
      throw redirect({ to: '/dashboard/' + user.id });
    }

    return { user };
  },
  notFoundComponent: () => <NotFoundComponent errorType="404" />,
});

function RouteComponent() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { user, vendor, setVendorProfile } = useMealJetStore((state) => state);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navigation = multiRoleRoutes[user?.role as keyof typeof multiRoleRoutes] || [];

  const { handleLogout } = useAuth();

  const avatarOptions = dasboardDropdownOptions.map((option) => {
    if (option.value === 'logout') {
      return {
        ...option,
        action: handleLogout,
      };
    }
    return option;
  });

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
        <Group px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <MJLogo />
        </Group>
        <Group>
          {user?.role === UserType.CUSTOMER ? (
            <AddtoCart />
          ) : user?.role === UserType.VENDOR ? (
            <VendorDropdown setVendorProfile={setVendorProfile} defaultValue={vendor} />
          ) : null}
          <MJAvatarDropdown
            items={avatarOptions}
            target={<Avatar name={user?.username as string} color="initials" />}
          />
        </Group>
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
      </AppShell.Navbar>
      <AppShell.Main className=" h-dvh overflow-y-auto">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
