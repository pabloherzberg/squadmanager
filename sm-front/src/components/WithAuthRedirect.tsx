import { useAppSelector } from '@/store/hooks';
import { LoginStatusEnum } from '@/types';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const WithAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const RedirectComponent = (props: any) => {
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const status = useAppSelector((state) => state.auth.status);

    useEffect(() => {
      if (status === LoginStatusEnum.succeeded && user) {
        router.push('/');
      }
    }, [status, user, router]);

    if (
      status === LoginStatusEnum.loading ||
      status === LoginStatusEnum.succeeded
    ) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return RedirectComponent;
};

export default WithAuthRedirect;
