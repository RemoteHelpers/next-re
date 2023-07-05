import { FC, useCallback } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import type {
  IVacanciesInfo,
  IVacancyPageData,
  ICategory,
  IFormData,
  INavUrlState,
  IInitialData,
  LocalesLiteral,
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
import { Vacancies } from '@/components/Vacancies';
import { VacanciesHero } from '@/components/Vacancies/components/VacanciesHero';
import { VacanciesForm } from '@/components/Vacancies/components/VacanciesForm';
import { titleCompanyInfo } from '@/constants';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { useRouter } from 'next/router';
import { appMetadata } from '@/api/metadata';

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  vacancyPageData: IVacancyPageData;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
};

const VacanciesPage: FC<Props> = ({
  vacanciesInfo,
  vacancyPageData,
  categories,
  initialData,
  formData,
  navUrlState,
}) => {
  const appMeta = appMetadata[useRouter().locale as LocalesLiteral];
  const metaTitle = useCallback(
    (): string => getPageTitle(initialData.header, 'vacancies') + titleCompanyInfo,
    [initialData.header]
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
      initialData: {
        header,
        footer,
        vacancies,
      },
      formData,
      vacanciesInfo,
      vacancyPageData,
      categories,
    },
  };
};
