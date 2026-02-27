import { createFileRoute, Link } from '@tanstack/react-router';
import MJLogo from '@/components/atoms/logo/MJLogo';
import AuthLoginForm from '@/components/organisms/forms/AuthLogin';
import { UserType } from '@/lib/types';

export const Route = createFileRoute('/auth/_pathlessLayout/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className=" text-center">
        <MJLogo className=" mx-auto block" />
        <h1 className=" text-2xl font-bold mt-4">Create an Account</h1>
      </div>
      <AuthLoginForm type={UserType.CUSTOMER} />
      <Link to="/auth/signup">
        <p className=" text-center mt-4 text-sm">
          Don't have an account? <span className=" text-primary">Signup</span>
        </p>
      </Link>
    </div>
  );
}
