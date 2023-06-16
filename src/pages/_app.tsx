import type { AppProps } from 'next/app';
import '@/shared/styles/globals.scss';
import { GlobalProvider } from '@/context';

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default App;
