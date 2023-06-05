import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '@/shared/styles/globals.scss';
import { GlobalProvider } from '@/context';
import { appMetadata } from '@/api/metadata';
import type { LocalesLiteral } from '@/shared/types/MetadataTypes';

function App({ Component, pageProps }: AppProps) {
  const locale = useRouter().locale! as LocalesLiteral;
  return (
    <GlobalProvider>
      <Head>
        <title>{appMetadata[locale].title}</title>
        <meta name="description" content={appMetadata[locale].description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={appMetadata[locale].canonical} />
        <meta property="og:locale" content={appMetadata[locale].og.locale} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={appMetadata[locale].og.title} />
        <meta property="og:description" content={appMetadata[locale].og.description} />
        <meta property="og:url" content={appMetadata[locale].og.url} />
        <meta property="og:site_name" content={appMetadata[locale].og.siteName} />
        <meta property="og:image" content={appMetadata[locale].og.image} />
      </Head>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default App;
