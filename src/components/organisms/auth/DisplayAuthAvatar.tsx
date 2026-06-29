import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { Avatar, Group } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJDropdown from '@/components/molecules/dropdowns/MJDropdown';
import VendorDropdown from '@/components/molecules/dropdowns/VendorDropdown';
import { dasboardDropdownOptions } from '@/lib/constants';
import { useAuth } from '@/lib/hooks';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType } from '@/lib/types';
import AddtoCart from '../cart/AddtoCart';

const DisplayAuthAvatar = () => {
  const { user, vendor, setVendorProfile } = useMealJetStore((state) => state);
  const router = useNavigate();

  const pathname = useRouterState({ select: (s) => s.location.pathname });

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

  const handleDisplayComponent = () => {
    if (!user) {
      if (pathname.includes('/dashboard')) {
        return null;
      }
      return (
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/auth/login">
            <MJButton variant="subtle" color="gray" size="sm" radius="xl">
              Sign in
            </MJButton>
          </Link>
          <Link to="/auth/signup">
            <MJButton
              size="sm"
              radius="xl"
              className="font-semibold shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              Get Started
            </MJButton>
          </Link>
        </div>
      );
    }

    if (
      user.role === UserType.CUSTOMER &&
      !pathname.includes('checkout') &&
      pathname.includes('/dashboard')
    ) {
      return <AddtoCart />;
    }

    if (user.role === UserType.VENDOR) {
      return <VendorDropdown setVendorProfile={setVendorProfile} defaultValue={vendor} />;
    }
  };
  const isDashboardRoute = user && pathname.includes('/dashboard');

  const isPublicRoute = user && !pathname.includes('/dashboard');

  const handleOnClick = () => {
    router({ to: '/dashboard' });
  };
  return (
    <Group>
      {handleDisplayComponent()}
      {isDashboardRoute ? (
        <MJDropdown
          items={avatarOptions}
          target={<Avatar name={user?.username as string} color="initials" />}
        />
      ) : isPublicRoute ? (
        <div
          onClick={handleOnClick}
          className="flex items-center cursor-pointer bg-primary/10 gap-2 pr-2.5 rounded-full py-0.5"
        >
          <Avatar name={user?.username as string} color="initials" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </div>
      ) : null}
    </Group>
  );
};

export default DisplayAuthAvatar;
