import { IconLogout } from '@tabler/icons-react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import MJButton from '@/components/atoms/buttons/MJButton';
import { SelectStoreForm } from '@/components/organisms/forms/SelectStoreForm';
import vendorClient from '@/lib/api/clients/vendor';
import { useAuth } from '@/lib/hooks';
import { UserType } from '@/lib/types';
import { requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute('/dashboard/_pathlessLayout/(select-store)/select-store')({
  component: RouteComponent,
  beforeLoad: async () => {
    requireRole([UserType.VENDOR]);
    try {
      const result = await vendorClient.vendorProfileCount();
      if (result.data.count == 0) {
        throw redirect({ to: '/dashboard/onboarding' });
      }
    } catch (error) {
      console.error('Error fetching vendor profile count:', error);
    }
  },
});

function RouteComponent() {
  const { handleLogout } = useAuth();

  const navigate = useNavigate();
  return (
    <section className=" h-dvh w-full relative bg-green-pattern flex items-center justify-center">
      <MJButton
        onClick={handleLogout}
        variant="subtle"
        className="absolute right-5 top-5"
        rightSection={<IconLogout />}
      >
        Logout
      </MJButton>
      <div className=" w-full max-w-3xl">
        <h1 className=" text-3xl text-white font-bold text-center mb-3">Select your store</h1>
        <SelectStoreForm />
        <p className="text-white text-center">
          Don't have a store yet?{' '}
          <MJButton
            variant="transparent"
            onClick={() => {
              navigate({ to: '/dashboard/onboarding' });
            }}
            className="underline"
          >
            Create one
          </MJButton>
        </p>
      </div>
    </section>
  );
}
