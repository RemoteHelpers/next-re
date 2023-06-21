import { FC, useCallback } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getCategories, getVideointerviewData } from '@/services';
import { Layout } from '@/components/Layout';
import { VideointerviewPage } from '@/components/VideoInterview';
import { getPageTitle } from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IMainData } from '@/shared/types/GlobalTypes';

type Props = { categories: ICategory[]; videoData: any; mainData: IMainData };
const Videointerview: FC<Props> = ({ categories, videoData, mainData }) => {
  const { header, formData } = mainData;
  const pageTitle = useCallback(() => getPageTitle(header, 'videointerview'), [header]);

  console.log('videoData', videoData);
  return (
    <>
      <Head>
        <title>{pageTitle() + titleCompanyInfo}</title>
        <meta property="og:title" content={pageTitle() + titleCompanyInfo} />
      </Head>

      <Layout categories={categories} mainData={mainData}>
        <VideointerviewPage videoData={videoData} header={header} formData={formData} />
      </Layout>
    </>
  );
};

export default Videointerview;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const categories = await getCategories(locale!);
  const videoData = await getVideointerviewData(locale!);
  return {
    props: {
      categories,
      videoData,
    },
  };
};
