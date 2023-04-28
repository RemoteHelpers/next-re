import type { AppProps } from 'next/app';
import '@/shared/styles/globals.scss';
import StoreProvider from '@/redux/Provider';
import { wrapper } from '@/redux/store';

function App({ Component, pageProps }: AppProps) {
  return (
    // <StoreProvider>
      <Component {...pageProps} />
    // </StoreProvider>
  );
}

export default wrapper.withRedux(App);
