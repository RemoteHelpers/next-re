import type { AppProps } from 'next/app';
import '@/shared/styles/globals.scss';
import StoreProvider from '@/redux/Provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
