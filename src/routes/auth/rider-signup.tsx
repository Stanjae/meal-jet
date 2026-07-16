import { createFileRoute } from '@tanstack/react-router';
import MJLogo from '@/components/atoms/logo/MJLogo';
import BikeOnRoad from '@/components/organisms/animations/BikeOnRoad';
import AuthSignupForm from '@/components/organisms/forms/AuthSignupForm';
import { UserType } from '@/lib/types';

export const Route = createFileRoute('/auth/rider-signup')({
  component: RiderSignupPage,
});

export default function RiderSignupPage() {
  return (
    <div
      className="flex h-screen flex-col justify-between pt-10 xl:pt-14 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#fc923a 0%,#f97316 55%,#ea580c 100%)' }}
    >
      {/* Background decor */}
      <div
        className="absolute animate-pulse -top-20 -right-20 w-64 h-64 rounded-full opacity-15"
        style={{ background: '#fff' }}
      />
      <div
        className="absolute -bottom-15 -left-10 w-48 h-48 rounded-full opacity-10"
        style={{ background: '#fff' }}
      />
      <div
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full border-2 border-dashed opacity-20"
        style={{ borderColor: '#fff', animation: 'spin-slow 25s linear infinite' }}
      />
      {/* Dots */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots-left" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-left)" />
      </svg>

      {/* Logo */}
      <div className="relative pl-10 xl:pl-14 z-10">
        <MJLogo mode="dark" />
      </div>
      <section className=" bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg w-full max-w-md">
        <div className="text-center">
          <h1 className=" text-2xl font-bold mt-4">Become a Rider</h1>
        </div>
        <AuthSignupForm type={UserType.RIDER} />
      </section>
      <BikeOnRoad />
    </div>
  );
}
