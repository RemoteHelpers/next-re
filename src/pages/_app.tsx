import type { AppProps } from 'next/app';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import '@/shared/styles/globals.scss';
import { GlobalProvider } from '@/context';
import Head from 'next/head';
import { appMetadata } from '@/api/metadata';
import { LocalesLiteral } from '@/shared/types/MetadataTypes';

function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const appMeta = appMetadata[(locale as LocalesLiteral) || 'en'];

  let greetings = 'hello world';
  const getGreetings = useCallback(
    (locale: string) => {
      switch (locale) {
        case 'uk':
          greetings = 'Привіт світе';
          break;

        case 'ru':
          greetings = 'адін народ';
          break;

        default:
          greetings = 'hello world';
          break;
      }

      return greetings;
    },
    [locale]
  );
  const updatedProps = { ...pageProps, greetings: getGreetings(locale!) };

  return (
    <>
      <Head>
        <title>{appMeta.title}</title>
        <meta name="description" content={appMeta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={appMeta.canonical} />
        <meta property="og:locale" content={appMeta.og.locale} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={appMeta.og.title} />
        <meta property="og:description" content={appMeta.og.description} />
        <meta property="og:url" content={appMeta.og.url} />
        <meta property="og:site_name" content={appMeta.og.siteName} />
        <meta property="og:image" content={appMeta.og.image} />
      </Head>
      <GlobalProvider>
        <Component {...updatedProps} />
      </GlobalProvider>
    </>
  );
}

export default App;
