import { FC } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { IMetadata, ICategory, IInitialData, INavUrlState, IThankYouData } from '@/shared/types';
import { getCategories } from '@/services';
import { Layout } from '@/components/Layout';
// import Thankyou from '@/components/Thankyou';
import { getAllVacancies, getFooterData, getHeaderData, getThankYouData } from '@/services';

const Thankyou = dynamic(() => import('@/components/Thankyou'));

type Props = {
  categories: ICategory[];
  thankYouData: IThankYouData;
  initialData: IInitialData;
  navUrlState: INavUrlState;
  metadata: IMetadata;
};
const ContactsPage: FC<Props> = ({ categories, thankYouData, initialData, navUrlState, metadata }) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
      </Head>

      <Layout data={{ ...initialData, ...navUrlState }} categories={categories}>
        {thankYouData && <Thankyou thankyouData={thankYouData} />}
      </Layout>
    </>
  );
};

export default ContactsPage;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const [header, footer, vacancies, categories, thankYouData] = await Promise.all([
    getHeaderData(locale!),
    getFooterData(locale!),
    getAllVacancies(locale!),
    getCategories(locale!),
    getThankYouData(locale!),
  ]);

  return {
    props: {
      initialData: { header, footer, vacancies },
      categories,
      thankYouData,
    },
  };
};
