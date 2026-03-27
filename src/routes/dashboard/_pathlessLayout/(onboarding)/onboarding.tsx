import { IconLogout } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import MJButton from '@/components/atoms/buttons/MJButton';
import VendorStepForm from '@/components/organisms/forms/VendorStepForm';
import { useAuth } from '@/lib/hooks';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType } from '@/lib/types';
import { requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute('/dashboard/_pathlessLayout/(onboarding)/onboarding')({
  component: RouteComponent,
  beforeLoad: () => requireRole(UserType.VENDOR),
});

function RouteComponent() {
  const { user } = useMealJetStore((state) => state);
  const { handleLogout } = useAuth();
  return (
    <section className=" h-dvh w-full bg-green-pattern flex items-center justify-center relative">
      <MJButton
        onClick={handleLogout}
        variant="subtle"
        className="absolute right-5 top-5"
        rightSection={<IconLogout />}
      >
        Logout
      </MJButton>
      <div className=" w-full max-w-5xl">
        <h1 className=" text-3xl text-white font-bold text-center mb-2">
          Let's get you set up, {user?.username}
        </h1>
        <VendorStepForm />
      </div>
    </section>
  );
}
