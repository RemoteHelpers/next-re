import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import type { NextPageContext } from 'next';
import '@/shared/styles/globals.scss';
import { appMetadata } from '@/api/metadata';
import type { LocalesLiteral } from '@/shared/types';
// import getDataByLocale from '@/shared/functions/mainDataGetter';

function App({ Component, pageProps }: AppProps) {
  // const locale = (useRouter().locale || 'en') as LocalesLiteral;
  const appMeta = appMetadata[useRouter().locale as LocalesLiteral];
  const [navURL, setNavURL] = useState<string>('');
  const props = { ...pageProps, navUrlState: { navURL, setNavURL } };

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
      <Component {...props} />
    </>
  );
}

export default App;
