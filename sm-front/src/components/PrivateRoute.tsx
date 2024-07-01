// src/components/PrivateRoute.tsx
import { useAppSelector } from '@/store/hooks';
import { LoginStatusEnum } from '@/types';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const PrivateRoute = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const router = useRouter();
    const status = useAppSelector((state) => state.auth.status);

    useEffect(() => {
      if (
        status === LoginStatusEnum.idle ||
        status === LoginStatusEnum.failed
      ) {
        router.push('/signin');
      }
    }, [status, router]);

    if (status === LoginStatusEnum.loading || status === LoginStatusEnum.idle) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default PrivateRoute;
