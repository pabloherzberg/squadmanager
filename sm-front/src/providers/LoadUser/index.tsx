import { LoadingScreen } from '@/components/Loading';
import { loadUserFromToken, logout, setAuthStatus } from '@/store/authSlice';
import { useAppDispatch } from '@/store/useRedux';
import { LoginStatusEnum, UserInterface } from '@/utils/types/index';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const LoadUser = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt.decode(token) as UserInterface & {
          exp: number;
        };

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          dispatch(logout());
        } else {
          dispatch(loadUserFromToken({ user: decodedToken, token }));
        }
      }
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      dispatch(setAuthStatus(LoginStatusEnum.idle));
    }
  }, [loading, dispatch]);

  return loading ? <LoadingScreen /> : null;
};

export default LoadUser;
