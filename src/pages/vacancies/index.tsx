import { FC, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { getCategories, getVacancyListData, getVacancyPageData } from '@/services';
import { Vacancies } from '@/components/Vacancies';
import { VacanciesHero } from '@/components/Vacancies/components/VacanciesHero/VacanciesHero';
import { VacanciesForm } from '@/components/Vacancies/components/VacanciesForm';
import type { IVacanciesInfo, IVacancyPageData } from '@/shared/types/VacanciesTypes';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IMainData } from '@/shared/types/GlobalTypes';
import Head from 'next/head';
import { getPageTitle } from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
import { GetServerSidePropsContext } from 'next';

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  vacancyPageData: IVacancyPageData;
  mainData: IMainData;
};

const VacanciesPage: FC<Props> = ({ vacanciesInfo, vacancyPageData, categories, mainData }) => {
  const { header } = mainData;
  const pageTitle = useCallback(() => getPageTitle(header, 'vacancies'), [header]);

  return (
    <>
      <Head>
        <title>{pageTitle() + titleCompanyInfo}</title>
        <meta property="og:title" content={pageTitle() + titleCompanyInfo} />
      </Head>

      <Layout categories={categories} mainData={mainData}>
        <VacanciesHero vacancyPageData={vacancyPageData} />
        <Vacancies
          vacanciesInfo={vacanciesInfo}
          categories={categories}
          vacancies={mainData.vacancies}
        />
        <VacanciesForm mainData={mainData} />
      </Layout>
    </>
  );
};

export default VacanciesPage;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const vacanciesInfo = await getVacancyListData(locale!);
  const vacancyPageData = await getVacancyPageData(locale!);
  const categories = await getCategories(locale!);
  return {
    props: {
      vacanciesInfo,
      vacancyPageData,
      categories,
    },
  };
};
