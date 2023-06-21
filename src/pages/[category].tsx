import { FC, useCallback } from 'react';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import type { IMainData, IVacanciesInfo, ICategory } from '@/shared/types';
import { getCategories, getCategoryBySlug, getVacancyListData } from '@/services';
import { Layout } from '@/components/Layout';
import { Category } from '@/components/Category';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';

interface CategoryPageProps {
  category: ICategory;
  categories: ICategory[];
  vacanciesInfo: IVacanciesInfo;
  mainData: IMainData;
}

const CategoryPage: FC<CategoryPageProps> = ({ category, categories, vacanciesInfo, mainData }) => {
  const metaTitle = useCallback(() => {
    return (
      getPageTitle(mainData.header, 'vacancies') +
      ' - ' +
      category.attributes.categoryTitle +
      titleCompanyInfo
    );
  }, [category]);
  return (
    <>
      <Head>
        <title>{metaTitle()}</title>
        <meta name="og:title" content={metaTitle()} />
      </Head>

      <Layout mainData={mainData} categories={categories}>
        <Category mainData={mainData} category={category} vacanciesInfo={vacanciesInfo} />
      </Layout>
    </>
  );
};

export default CategoryPage;

export const getServerSideProps = async ({ locale, params }: GetServerSidePropsContext) => {
  const categories = await getCategories(locale!);
  const category = await getCategoryBySlug(locale!, params?.category as string);
  const vacanciesInfo = await getVacancyListData(locale!);

  if (!locale || !params?.category || !categories || !category || !vacanciesInfo) {
    return { notFound: true };
  }

  return {
    props: {
      category,
      categories,
      vacanciesInfo,
    },
  };
};
