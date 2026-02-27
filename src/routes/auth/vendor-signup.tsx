import { createFileRoute, Link } from '@tanstack/react-router';
import MJLogo from '@/components/atoms/logo/MJLogo';
import AuthSignupForm from '@/components/organisms/forms/AuthSignupForm';
import { UserType } from '@/lib/types';

export const Route = createFileRoute('/auth/vendor-signup')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-green-pattern h-dvh relative pt-8 px-8">
      <div className="flex items-center justify-between">
        <MJLogo />
        <div>
          <Link to="/auth/login">
            <p className=" text-center mt-4 text-lg font-semibold text-white">
              Already have an account? <span className=" text-primary">Log in</span>
            </p>
          </Link>
        </div>
      </div>
      <section className=" bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg w-full max-w-md">
        <div className="text-center">
          <h1 className=" text-2xl font-bold mt-4">Become a Vendor</h1>
        </div>
        <AuthSignupForm type={UserType.VENDOR} />
      </section>
    </div>
  );
}
