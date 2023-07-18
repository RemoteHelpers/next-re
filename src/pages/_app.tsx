import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import '@/shared/styles/globals.scss';
import type { LocalesLiteral, AppMetadata } from '@/shared/types';
import { getMetadata } from '@/services/MetadataService';

function App({ Component, pageProps, meta }: AppProps & { meta: AppMetadata }) {
  const metadata = meta[useRouter().locale as LocalesLiteral];
  const [navURL, setNavURL] = useState<string>('');
  const props = { ...pageProps, navUrlState: { navURL, setNavURL }, metadata };
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:locale" content={metadata.locale} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:site_name" content={metadata.sitename} />
        <meta property="og:image" content="/logo.jpg" />
      </Head>

      <Component {...props} />
    </>
  );
}

App.getInitialProps = async () => {
  const meta = await getMetadata();
  return { meta };
};

export default App;
