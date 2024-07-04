import { LoadingScreen } from '@/components/Loading';
import { loadUserFromToken, logout, setAuthStatus } from '@/store/authSlice';
import { paths } from '@/store/paths';
import { useAppDispatch, useAppSelector } from '@/store/useRedux';
import { QueryStatusEnum, UserInterface } from '@/utils/types/index';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PrivateRoute = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const authSelector = useAppSelector((state) => state.auth);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token') || authSelector.token;
        console.log('token', token);
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
        }
        setLoading(false);
      }
    }, [dispatch, authSelector.token]);

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
