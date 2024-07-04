import { LoadingScreen } from '@/components/Loading';
import { loadUserFromToken, logout, setAuthStatus } from '@/store/authSlice';
import { paths } from '@/store/paths';
import { useAppDispatch } from '@/store/useRedux';
import { QueryStatusEnum, UserInterface } from '@/utils/types/index';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PrivateRoute = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const validateToken = (token: string | null | undefined) => {
        if (token) {
          const decodedToken = jwt.decode(token) as UserInterface & {
            exp: number;
          };

          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            dispatch(logout());
            router.replace(paths.signIn);
          } else {
            dispatch(loadUserFromToken({ user: decodedToken, token }));
          }
        } else {
          dispatch(logout());
          router.replace(paths.signIn);
        }
        setLoading(false);
      };

      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        validateToken(token);
      } else {
        setLoading(false);
      }
    }, [dispatch, router]);

    useEffect(() => {
      if (!loading) {
        dispatch(setAuthStatus(QueryStatusEnum.idle));
      }
    }, [loading, dispatch]);

    if (loading) {
      return <LoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default PrivateRoute;
