import { FC, useCallback } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { GetServerSidePropsContext } from 'next';
import type {
  IMetadata,
  ICategory,
  IFormData,
  IInitialData,
  INavUrlState,
  IVideointerview,
} from '@/shared/types';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getFormData,
  getHeaderData,
  getVideointerviewData,
} from '@/services';
import { Layout } from '@/components/Layout';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
import { VideointerviewHero } from '@/components/VideoInterview/components/VideointerviewHero';

const VideointerviewPage = dynamic(() => import('@/components/VideoInterview'));

type Props = {
  categories: ICategory[];
  videoData: IVideointerview;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
  metadata: IMetadata;
};
const Videointerview: FC<Props> = ({
  categories,
  videoData,
  initialData,
  formData,
  navUrlState,
  metadata,
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
        <meta name="description" content={metadata.description} />
        <meta property="og:description" content={metadata.description} />
      </Head>

      <Layout categories={categories} data={{ ...initialData, ...navUrlState }}>
        <VideointerviewHero videoData={videoData} />
        <VideointerviewPage videoData={videoData} header={header} formData={formData} />
      </Layout>
    </>
  );
};

export default Videointerview;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
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
      initialData: { header, footer, vacancies },
      formData,
      categories,
      videoData,
    },
  };
};
