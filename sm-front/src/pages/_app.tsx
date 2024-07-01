import store from '@/store';
import { loadUserFromToken, logout } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import jwt from 'jsonwebtoken';
import { ComponentType, useEffect } from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.css';

const LoadUser = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt.decode(token) as {
          id: number;
          username: string;
          email: string;
          role: string;
          createdAt: string;
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
    }
  }, [dispatch]);

  return null;
};

function App({
  Component,
  pageProps,
}: {
  Component: ComponentType<any>;
  pageProps: any;
}) {
  return (
    <Provider store={store}>
      <LoadUser />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
