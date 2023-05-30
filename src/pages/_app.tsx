import type { AppProps } from 'next/app';
import '@/shared/styles/globals.scss';
import { GlobalProvider } from '@/context';
import Head from 'next/head';
import { IntlProvider, IntlErrorCode } from 'next-intl';

function onError(error: any): void {
  if (error.code === IntlErrorCode.MISSING_MESSAGE)
    console.error('ОБРОБНИК ПОМИЛОК, відстуній переклад');
  else console.log('ОБРОБНИК ПОМИЛОК, інша помилка в коді');
}

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Head>
        <title>Remote Helpers</title>
        <meta name="description" content="The outstaffing company" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IntlProvider onError={onError} messages={pageProps.translations} locale="ru">
        <Component {...pageProps} />
      </IntlProvider>
    </GlobalProvider>
  );
}

export default App;
