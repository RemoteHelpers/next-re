import type { AppProps } from 'next/app';
import type { GetServerSidePropsContext, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '@/shared/styles/globals.scss';
import { appMetadata } from '@/api/metadata';
import { getAllVacancies, getFooterData, getFormData, getHeaderData } from '@/services';
import type {
  LocalesLiteral,
  IHeader,
  IFooterData,
  IVacancy,
  IFormData,
  IMainData,
} from '@/shared/types';

function App({ Component, pageProps, initialData }: AppProps & { initialData: IMainData }) {
  const { locale } = useRouter();
  const appMeta = appMetadata[(locale as LocalesLiteral) || 'en'];

  const props = { ...pageProps, mainData: initialData };

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

App.getInitialProps = async ({ locale }: NextPageContext) => {
  // App.getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  // const locale = defaultLocale ? defaultLocale : 'en';
  // const fullUrl = req ? `${req.headers.host}${req.url}` : 'NO URL';
  const localeProvider = locale || 'ru';
  const headerData: IHeader = await getHeaderData(localeProvider);
  const footerData: IFooterData = await getFooterData(localeProvider);
  const vacanciesData: IVacancy[] = await getAllVacancies(localeProvider);
  const formData: IFormData = await getFormData(localeProvider);

  return {
    initialData: {
      header: headerData,
      footer: footerData,
      vacancies: vacanciesData,
      formData: formData,
    },
  };
};

export default App;
