import { createFileRoute, Link, Outlet, redirect, useLocation } from '@tanstack/react-router';
import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MJLogo from '@/components/atoms/logo/MJLogo';
import MJAvatarDropdown from '@/components/molecules/dropdowns/MJAvatarDropdown';
import AddtoCart from '@/components/organisms/cart/AddtoCart';
import { dasboardDropdownOptions, multiRoleRoutes } from '@/lib/constants';
import { useAuth } from '@/lib/hooks';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { requireAuth } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute('/dashboard/$userId/_pathlessLayout')({
  component: RouteComponent,
  beforeLoad: ({ params }) => {
    const { user } = requireAuth();

    // Verify userId in URL matches current user
    if (user.id !== params.userId) {
      throw redirect({ to: '/dashboard/' + user.id });
    }

    return { user };
  },
});

function RouteComponent() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const user = useMealJetStore((state) => state.user);

  const pathname = useLocation();

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
          <AddtoCart />
          <MJAvatarDropdown items={avatarOptions} name={user?.username as string} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <section>
          {navigation.map((item) => (
            <NavLink
              label={item.label}
              key={item.label}
              className="rounded-md"
              styles={{ label: { fontSize: 15, fontWeight: 600 } }}
              leftSection={item.icon ? <item.icon size={16} /> : null}
              component={Link}
              to={item.path}
              variant="filled"
              active={pathname.href === item.path}
            />
          ))}
        </section>
      </AppShell.Navbar>
      <AppShell.Main className=" h-dvh overflow-y-auto">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
