import { Box, Divider } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJButtonImg from '@/components/atoms/buttons/MJButtonImg';
import MJPasswordInput from '@/components/atoms/inputs/MJPasswordInput';
import MJTextinput from '@/components/atoms/inputs/MJTextinput';
import { loginDefaultValues } from '@/lib/constants';
import { useAuth, useMealjetForm } from '@/lib/hooks';
import { UserType } from '@/lib/types';
import { loginSchema } from '@/lib/utils/schema';

const AuthLoginForm = ({ type }: { type: UserType }) => {
  const form = useMealjetForm({
    schema: loginSchema,
    defaultValues: loginDefaultValues,
  });

  const { handleLogin } = useAuth();

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleLogin)} className=" space-y-2">
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
        <MJButton loading={form.submitting} size="md" radius={'md'} mt={30} type="submit" fullWidth>
          Log In
        </MJButton>
      </form>

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
            Log In With Google
          </MJButtonImg>
        </div>
      )}
    </Box>
  );
};

export default AuthLoginForm;
