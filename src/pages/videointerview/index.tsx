import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import type {
  ICategory,
  IFormData,
  IInitialData,
  INavUrlState,
  IVideointerview,
  LocalesLiteral,
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
import { VideointerviewPage } from '@/components/VideoInterview';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
import { appMetadata } from '@/api/metadata';

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
  const appMeta = appMetadata[useRouter().locale as LocalesLiteral];
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

        <meta name="description" content={appMeta.description} />
        <meta property="og:description" content={appMeta.og.description} />
      </Head>

      <Layout categories={categories} data={{ ...initialData, ...navUrlState }}>
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
