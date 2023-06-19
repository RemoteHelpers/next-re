import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import '@/shared/styles/globals.scss';
import { GlobalProvider } from '@/context';
import { appMetadata } from '@/api/metadata';
import type { LocalesLiteral } from '@/shared/types/MetadataTypes';
import type { IHeader } from '@/shared/types/HeaderTypes';
import type { IFooterData } from '@/shared/types/FooterTypes';
import type { IVacancy } from '@/shared/types/VacanciesTypes';
import type { IFormData } from '@/shared/types/FormTypes';
import { getAllVacancies, getFooterData, getFormData, getHeaderData } from '@/services';
import { NextPageContext } from 'next';

function App({ Component, pageProps, globalData }: AppProps & any) {
  const { locale } = useRouter();
  const appMeta = appMetadata[(locale as LocalesLiteral) || 'en'];

  const props = { ...pageProps, globalData };
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
        <Component {...props} />
      </GlobalProvider>
    </>
  );
}

App.getInitialProps = async ({ locale, req, asPath }: NextPageContext) => {
  // const locale = defaultLocale ? defaultLocale : 'en';
  // const fullUrl = req ? `${req.headers.host}${req.url}` : 'NO URL';

  const headerData: IHeader = await getHeaderData(locale || 'en');
  const footerData: IFooterData = await getFooterData(locale || 'en');
  const vacanciesData: IVacancy[] = await getAllVacancies(locale || 'en');
  const formData: IFormData = await getFormData(locale || 'en');

  const globalData = {
    header: headerData,
    footer: footerData,
    vacancies: vacanciesData,
    formData: formData,
    asPath,
  };

  return { globalData };
};

export default App;
