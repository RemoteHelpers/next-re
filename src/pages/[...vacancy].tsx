import { FC } from 'react';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import type { IMainData, ICategory, IVacancy, IVacanciesInfo } from '@/shared/types';
import { Layout } from '@/components/Layout';
import { Vacancy } from '@/components/Vacancy';
import { getCategoryBySlug, getVacancy, getVacancyListData, getCategories } from '@/services';
import { VacancyNew } from '@/components/VacancyNew';
import { titleCompanyInfo } from '@/constants';

interface VacancyPageProps {
  categories: ICategory[];
  vacancy: IVacancy;
  vacanciesInfo: IVacanciesInfo;
  category: ICategory;
  mainData: IMainData;
}

const VacancyPage: FC<VacancyPageProps> = ({
  categories,
  vacancy,
  vacanciesInfo,
  category,
  mainData,
}: VacancyPageProps) => {
  if (!vacancy.attributes) return <></>;
  const { newVersion, seoData, title, cardDescription } = vacancy.attributes;

  const metaTitle = seoData ? seoData.seoTitle : title + titleCompanyInfo;
  const metaDescr = seoData ? seoData.seoDescription : cardDescription;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescr} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescr} />
      </Head>

      <Layout categories={categories} mainData={mainData}>
        {newVersion ? (
          <VacancyNew mainData={mainData} vacancy={vacancy} category={category} />
        ) : (
          <Vacancy
            mainData={mainData}
            vacancy={vacancy}
            vacanciesInfo={vacanciesInfo}
            category={category}
          />
        )}
      </Layout>
    </>
  );
};

export default VacancyPage;

export const getServerSideProps = async ({ params, locale }: GetServerSidePropsContext) => {
  const [categorySlug, vacancySlug] = params?.vacancy!;
  /* queries for layout */
  const categories = await getCategories(locale!);
  /* queries for vacancy */
  const vacancy = await getVacancy(locale!, vacancySlug);
  const vacanciesInfo = await getVacancyListData(locale!);
  const category = await getCategoryBySlug(locale!, categorySlug);
  if (
    !locale ||
    !categorySlug ||
    !vacancySlug ||
    !categories ||
    !vacancy ||
    !category ||
    !vacanciesInfo
  ) {
    return { notFound: true };
  }

  return {
    props: {
      categories,
      vacancy,
      vacanciesInfo,
      category,
    },
  };
};
