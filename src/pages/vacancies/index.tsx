import { FC, useCallback } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type {
  IVacanciesInfo,
  IVacancyPageData,
  ICategory,
  IFormData,
  INavUrlState,
  IInitialData,
  IMetadata,
} from '@/shared/types';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getFormData,
  getHeaderData,
  getVacancyListData,
  getVacancyPageData,
} from '@/services';
import { Layout } from '@/components/Layout';
import { titleCompanyInfo } from '@/constants';
import getPageTitle from '@/shared/functions/pageTitleGetter';
const VacanciesHero = dynamic(() => import('@/components/Vacancies/components/VacanciesHero'));
const Vacancies = dynamic(() => import('@/components/Vacancies/Vacancies'));
const VacanciesForm = dynamic(() => import('@/components/Vacancies/components/VacanciesForm'));

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  vacancyPageData: IVacancyPageData;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
  metadata: IMetadata;

};

const VacanciesPage: FC<Props> = ({
  vacanciesInfo,
  vacancyPageData,
  categories,
  initialData,
  formData,
  navUrlState,
  metadata
}) => {
  const metaTitle = useCallback(
    (): string => getPageTitle(initialData.header, 'vacancies') + titleCompanyInfo,
    [initialData.header]
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
        <VacanciesHero vacancyPageData={vacancyPageData} />
        <Vacancies
          vacanciesInfo={vacanciesInfo}
          categories={categories}
          vacancies={initialData.vacancies}
          navUrlState={navUrlState}
        />
        <VacanciesForm formData={formData} header={initialData.header} />
      </Layout>
    </>
  );
};

export default VacanciesPage;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const [header, footer, vacancies, formData, vacanciesInfo, vacancyPageData, categories] =
    await Promise.all([
      getHeaderData(locale!),
      getFooterData(locale!),
      getAllVacancies(locale!),
      getFormData(locale!),
      getVacancyListData(locale!),
      getVacancyPageData(locale!),
      getCategories(locale!),
    ]);

  return {
    props: {
      initialData: { header, footer, vacancies },
      formData,
      vacanciesInfo,
      vacancyPageData,
      categories,
    },
  };
};
