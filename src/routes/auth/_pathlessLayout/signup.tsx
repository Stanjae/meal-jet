import { createFileRoute, Link } from '@tanstack/react-router';
import MJLogo from '@/components/atoms/logo/MJLogo';
import AuthSignupForm from '@/components/organisms/forms/AuthSignupForm';
import { UserType } from '@/lib/types';

export const Route = createFileRoute('/auth/_pathlessLayout/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className=" text-center">
        <MJLogo className=" mx-auto block" />
        <h1 className=" text-2xl font-bold mt-4">Create an Account</h1>
      </div>
      <AuthSignupForm type={UserType.CUSTOMER} />
      <Link to="/auth/login">
        <p className=" text-center mt-4 text-sm">
          Already have an account? <span className=" text-primary">Log in</span>
        </p>
      </Link>
    </div>
  );
}
