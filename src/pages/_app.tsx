import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { LocalesLiteral } from '@/shared/types';
import '@/shared/styles/globals.scss';
import { appMetadata } from '@/api/metadata';

function App({ Component, pageProps }: AppProps) {
  const appMeta = appMetadata[useRouter().locale as LocalesLiteral];
  const [navURL, setNavURL] = useState<string>('');
  const props = { ...pageProps, navUrlState: { navURL, setNavURL } };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={appMeta.canonical} />
        <meta property="og:locale" content={appMeta.og.locale} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={appMeta.og.url} />
        <meta property="og:site_name" content={appMeta.og.siteName} />
        <meta property="og:image" content="/logo.jpg" />
      </Head>

      <Component {...props} />
    </>
  );
}

export default App;
