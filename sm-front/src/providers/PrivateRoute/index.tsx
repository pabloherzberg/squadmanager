import { LoadingScreen } from '@/components/Loading';
import { paths } from '@/store/paths';
import { useAppSelector } from '@/store/useRedux';
import { LoginStatusEnum } from '@/utils/types/index';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PrivateRoute = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const router = useRouter();
    const auth = useAppSelector((state) => state.auth);
    const [isTokenChecked, setIsTokenChecked] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (!auth.token && auth.status !== LoginStatusEnum.loading) {
          router.replace(paths.signIn);
        }
        setIsTokenChecked(true);
      }, 1000);

      return () => clearTimeout(timer);
    }, [router, auth.token, auth.status]);

    if (auth.status === LoginStatusEnum.loading || !isTokenChecked) {
      return <LoadingScreen />;
    }

    if (!auth.token || auth.status === LoginStatusEnum.failed) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default PrivateRoute;
