import { FC, useCallback } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getFormData,
  getHeaderData,
  getVideointerviewData,
} from '@/services';
import { Layout } from '@/components/Layout';
import { VideointerviewPage } from '@/components/VideoInterview';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
import type {
  ICategory,
  IFormData,
  IInitialData,
  IMainData,
  INavUrlState,
  IVideointerview,
} from '@/shared/types';

type Props = {
  categories: ICategory[];
  videoData: IVideointerview;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
};
const Videointerview: FC<Props> = ({
  categories,
  videoData,
  initialData,
  formData,
  navUrlState,
}) => {
  const { header } = initialData;
  const metaTitle = useCallback(
    () => getPageTitle(header, 'videointerview') + titleCompanyInfo,
    [header]
  );

  return (
    <>
      <Head>
        <title>{metaTitle()}</title>
        <meta property="og:title" content={metaTitle()} />
      </Head>

      <Layout categories={categories} data={{ ...initialData, ...navUrlState }}>
        <VideointerviewPage videoData={videoData} header={header} formData={formData} />
      </Layout>
    </>
  );
};

export default Videointerview;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  // const categories = await getCategories(locale!);
  // const videoData = await getVideointerviewData(locale!);
  const [header, footer, vacancies, formData, categories, videoData] = await Promise.all([
    getHeaderData(locale!),
    getFooterData(locale!),
    getAllVacancies(locale!),
    getFormData(locale!),
    getCategories(locale!),
    getVideointerviewData(locale!),
  ]);

  return {
    props: {
      initialData: {
        header,
        footer,
        vacancies,
      },
      formData,
      categories,
      videoData,
    },
  };
};
