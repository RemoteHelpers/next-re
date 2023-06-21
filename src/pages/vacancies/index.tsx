import { FC, useCallback } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import type { IMainData, IVacanciesInfo, IVacancyPageData, ICategory } from '@/shared/types';
import { getCategories, getVacancyListData, getVacancyPageData } from '@/services';
import { Layout } from '@/components/Layout';
import { Vacancies } from '@/components/Vacancies';
import { VacanciesHero } from '@/components/Vacancies/components/VacanciesHero';
import { VacanciesForm } from '@/components/Vacancies/components/VacanciesForm';
import { titleCompanyInfo } from '@/constants';
import getPageTitle from '@/shared/functions/pageTitleGetter';

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  vacancyPageData: IVacancyPageData;
  mainData: IMainData;
};

const VacanciesPage: FC<Props> = ({ vacanciesInfo, vacancyPageData, categories, mainData }) => {
  const metaTitle = useCallback(
    () => getPageTitle(mainData.header, 'vacancies') + titleCompanyInfo,
    [mainData.header]
  );

  return (
    <>
      <Head>
        <title>{metaTitle()}</title>
        <meta property="og:title" content={metaTitle()} />
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
