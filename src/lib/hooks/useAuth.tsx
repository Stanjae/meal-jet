import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import authClient from '../api/clients/auth';
import { useCreateCustomerSignup, useLogin, useLogout } from '../api/services';
import { useMealJetStore } from '../store/zustand.store';
import type { LoginFormData, SignupFormData } from '../utils/schema';

const useAuth = () => {
  const createCustomerSignup = useCreateCustomerSignup();

  const logout = useLogout();

  const { setUser } = useMealJetStore();

  const loginUser = useLogin();
  const navigate = useNavigate();
  const handleSignUp = async (payload: SignupFormData) => {
    try {
      const response = await createCustomerSignup.mutateAsync(payload);
      notifications.show({
        title: 'Signup Successful',
        message: response?.data?.message,
        color: 'green',
      });
      navigate({
        to: payload.role === 'customer' ? '/auth/signup' : '/auth/vendor-signup',
        hash: 'awaiting-verification',
      });
    } catch (err) {
      const newError = err as AxiosError<{ message: string; success: boolean }>;
      const { message, success } = newError?.response?.data || {};
      notifications.show({
        title: success ? 'Signup Successful' : 'Signup Failed',
        message: message || 'An error occurred during signup. Please try again.',
        color: 'red',
      });
    }
  };

  const handleLogin = async (payload: LoginFormData) => {
    try {
      const response = await loginUser.mutateAsync(payload);
      notifications.show({
        title: 'Login Successful',
        message: response?.data?.message,
        color: 'green',
      });
      const { user } = response.data;
      console.log('Login response:', response);

      if (user.emailVerified && ['banned', 'suspended'].includes(user.status)) {
        notifications.show({
          title: 'Account Suspended',
          message: `Your account has been ${user.status}. Please contact support for more information.`,
          color: 'red',
        });
        return;
      }

      if (user.emailVerified && user.status === 'active') {
        setUser(user);
        navigate({
          to: user.role === 'admin' ? '/admin-dashboard/home' : '/dashboard/$userId',
          params: {
            userId: user.id,
          },
        });
      }
    } catch (err) {
      const newError = err as AxiosError<{ message: string; success: boolean }>;

      console.dir(newError);
      const { data, status } = newError?.response || {};

      if (status === 403) {
        await authClient.verifyNow(payload.email);
        localStorage.setItem('start-verification', 'true');
        localStorage.setItem('email', payload.email);
        navigate({
          to: '/auth/verify-now',
        });
        return;
      }
      notifications.show({
        title: data?.success ? 'Login Successful' : 'Login Failed',
        message: data?.message || 'An error occurred during login. Please try again.',
        color: 'red',
      });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout.mutateAsync();
      notifications.show({
        title: 'Logout Successful',
        message: response?.data?.message,
        color: 'green',
      });
      setUser(null);
      navigate({ to: '/' });
    } catch (err) {
      const newError = err as AxiosError<{ message: string; success: boolean }>;
      const { message, success } = newError?.response?.data || {};
      notifications.show({
        title: success ? 'Logout Successful' : 'Logout Failed',
        message: message || 'An error occurred during logout. Please try again.',
        color: 'red',
      });
    }
  };

  return {
    handleSignUp,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
