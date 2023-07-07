import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { LocalesLiteral } from '@/shared/types';
import '@/shared/styles/globals.scss';
import { appMetadata } from '@/api/metadata';
// import {
//   getFullFooterData,
//   getFullFormData,
//   getFullHeaderData,
//   getFullVacanciesData,
// } from '@/services/MainDataService';

function App({ Component, pageProps, data }: AppProps & any) {
  // const { locale } = useRouter();
  const appMeta = appMetadata[useRouter().locale as LocalesLiteral];
  const [navURL, setNavURL] = useState<string>('');
  // const appData = {
  //   header: data.header[locale!],
  //   footer: data.footer[locale!],
  //   form: data.form[locale!],
  //   vacancies: data.vacancies[locale!],
  // };
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

// App.getInitialProps = async () => {
//   const [header, footer, form] = await Promise.all([
//     getFullHeaderData(),
//     getFullFooterData(),
//     getFullFormData(),
//   ]);

//   const vacancies = await getFullVacanciesData();

//   return {
//     data: { header, footer, form, vacancies },
//   };
// };

export default App;
