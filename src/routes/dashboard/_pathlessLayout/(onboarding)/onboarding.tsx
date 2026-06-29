import { createFileRoute } from '@tanstack/react-router';
import RiderOnboarding from '@/components/organisms/onboarding/RiderOnboarding';
import VendorOnboarding from '@/components/organisms/onboarding/VendorOnboarding';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType } from '@/lib/types';
import { requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute('/dashboard/_pathlessLayout/(onboarding)/onboarding')({
  component: RouteComponent,
  beforeLoad: () => requireRole([UserType.VENDOR, UserType.RIDER]),
});

function RouteComponent() {
  const { user } = useMealJetStore((state) => state);

  const onboardingFormToShow =
    user?.role === UserType.VENDOR ? <VendorOnboarding /> : <RiderOnboarding />;

  return onboardingFormToShow || null;
}
