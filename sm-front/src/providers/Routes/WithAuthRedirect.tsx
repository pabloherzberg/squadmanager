import { useAppSelector } from '@/store/hooks';
import { LoginStatusEnum } from '@/utils/types/user';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const WithAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const RedirectComponent = (props: any) => {
    const router = useRouter();
    const status = useAppSelector((state) => state.auth.status);
    const token = useAppSelector((state) => state.auth.token);

    console.log({ status });
    console.log('withAuthRedirect', token);
    useEffect(() => {
      if (token) {
        router.push('/');
      }
    }, [router, token]);

    if (status === LoginStatusEnum.loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return RedirectComponent;
};

export default WithAuthRedirect;
