import { DefaultLayout } from '@/components/Layout';
import queryClient from '@/providers/QueryClient';
import ToastContextProvider from '@/providers/ToastProvider';
import store from '@/store';

import { persistor } from '@/store/index';
import theme from '@/styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ComponentType, useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css';

function App({
  Component,
  pageProps,
}: {
  Component: ComponentType<any>;
  pageProps: any;
}) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <DefaultLayout>
            <ThemeProvider theme={theme}>
              <ToastContextProvider>
                <Component {...pageProps} />
              </ToastContextProvider>
            </ThemeProvider>
          </DefaultLayout>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
