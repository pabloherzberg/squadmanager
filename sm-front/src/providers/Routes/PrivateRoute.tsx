import { useAppSelector } from '@/store/hooks';
import { LoginStatusEnum } from '@/utils/types/user';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const PrivateRoute = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.token);
    const status = useAppSelector((state) => state.auth.status);

    console.log({ status });
    console.log('PrivateRoute', token);

    useEffect(() => {
      if (!token) {
        router.push('/sign-in');
      }
    }, [router, token]);

    if (status === LoginStatusEnum.loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default PrivateRoute;
