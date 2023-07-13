import { FC } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { GetServerSidePropsContext } from 'next';
import type {
  IMainData,
  ICategory,
  IVacancy,
  IVacanciesInfo,
  IInitialData,
  IFormData,
  INavUrlState,
} from '@/shared/types';
import {
  getCategoryBySlug,
  getVacancy,
  getVacancyListData,
  getCategories,
  getHeaderData,
  getFooterData,
  getAllVacancies,
  getFormData,
} from '@/services';
import { Layout } from '@/components/Layout';
import { titleCompanyInfo } from '@/constants';

const VacancyNew = dynamic(()=>import('@/components/VacancyNew'))
const Vacancy = dynamic(()=>import('@/components/Vacancy'))

type Props = {
  categories: ICategory[];
  vacancy: IVacancy;
  vacanciesInfo: IVacanciesInfo;
  category: ICategory;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
};
type Params = { category: string; vacancy: string };

const VacancyPage: FC<Props> = ({
  categories,
  vacancy,
  vacanciesInfo,
  category,
  initialData,
  formData,
  navUrlState,
}) => {
  const mainData: IMainData = { ...initialData, formData, ...navUrlState };
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

      <Layout categories={categories} data={{ ...initialData, ...navUrlState }}>
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
  const { category: categorySlug, vacancy: vacancySlug } = params as Params;

  const data = await Promise.all([
    getHeaderData(locale!),
    getFooterData(locale!),
    getAllVacancies(locale!),
    getFormData(locale!),
    getCategories(locale!),
    getVacancy(locale!, vacancySlug),
    getVacancyListData(locale!),
    getCategoryBySlug(locale!, categorySlug),
  ]);
  const isAnyValueMissing = data.some(value => !value);
  if (isAnyValueMissing) return { notFound: true };
  const [header, footer, vacancies, formData, categories, vacancy, vacanciesInfo, category] = data;

  return {
    props: {
      initialData: { header, footer, vacancies },
      formData,
      categories,
      vacancy,
      vacanciesInfo,
      category,
    },
  };
};
