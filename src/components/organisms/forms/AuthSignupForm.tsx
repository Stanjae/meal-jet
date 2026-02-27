import { useLocation } from '@tanstack/react-router';
import { Box, Divider } from '@mantine/core';
import MJAlert from '@/components/atoms/alerts/MJAlert';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJButtonImg from '@/components/atoms/buttons/MJButtonImg';
import MJPasswordInput from '@/components/atoms/inputs/MJPasswordInput';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import { signUpDefaultValuesCustomer } from '@/lib/constants';
import { useAuth, useMealjetForm } from '@/lib/hooks';
import { UserType } from '@/lib/types';
import { signupSchema } from '@/lib/utils/schema';

const AuthSignupForm = ({ type }: { type: UserType }) => {
  const form = useMealjetForm({
    schema: signupSchema,
    defaultValues: { ...signUpDefaultValuesCustomer, role: type },
  });

  const { handleSignUp } = useAuth();

  const location = useLocation();
  return (
    <Box>
      {location.hash === 'awaiting-verification' ? (
        <MJAlert
          title={'Verification Pending'}
          className=" mt-3"
          message={
            'Thank you for signing up! Please check your email for instructions on how to verify your account. Once verified, you can log in and start using our services.'
          }
        />
      ) : (
        <form onSubmit={form.onSubmit(handleSignUp)} className=" space-y-2">
          <MJTextinput
            radius={'md'}
            label="Name"
            placeholder="Enter your username"
            {...form.getInputProps('username')}
            key={form.key('username')}
          />
          <MJTextinput
            radius={'md'}
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps('email')}
            key={form.key('email')}
          />
          <MJPasswordInput
            radius={'md'}
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps('password')}
            key={form.key('password')}
          />
          <MJButton
            loading={form.submitting}
            size="md"
            radius={'md'}
            mt={30}
            type="submit"
            fullWidth
          >
            Sign Up
          </MJButton>
        </form>
      )}
      {type === UserType.CUSTOMER && (
        <Divider my="lg" label="Continue with" className="w-1/2 mx-auto" labelPosition="center" />
      )}
      {type === UserType.CUSTOMER && (
        <div>
          <MJButtonImg
            imgSrc="/google-color.svg"
            size="md"
            radius={'md'}
            variant="outline"
            fullWidth
          >
            Sign Up With Google
          </MJButtonImg>
        </div>
      )}
    </Box>
  );
};

export default AuthSignupForm;
