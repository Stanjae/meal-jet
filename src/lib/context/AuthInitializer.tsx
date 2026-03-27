import { useEffect } from 'react';
import { useIsAuthenticated } from '../api/services';
import { useMealJetStore } from '../store/zustand.store';

const AuthInitializer = () => {
  const { data, isError, isSuccess } = useIsAuthenticated();
  const { setUser, clearUser } = useMealJetStore();

  useEffect(() => {
    if (isError) {
      clearUser();
      return;
    }
    if (isSuccess && data?.data?.isAuthenticated) {
      setUser(data.data.user);
    }
  }, [data, setUser, clearUser, isError, isSuccess]);
  return null;
};

export default AuthInitializer;
