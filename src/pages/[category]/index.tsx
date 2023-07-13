import { FC, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import type { IVacanciesInfo, ICategory, IFormData, INavUrlState, IInitialData, IMetadata } from '@/shared/types';
import {
  getAllVacancies,
  getCategories,
  getCategoryBySlug,
  getFooterData,
  getFormData,
  getHeaderData,
  getVacancyListData,
} from '@/services';
import { Layout } from '@/components/Layout';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
const Category = dynamic(() => import('@/components/Category'))

interface CategoryPageProps {
  category: ICategory;
  categories: ICategory[];
  vacanciesInfo: IVacanciesInfo;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
  metadata: IMetadata;
}

const CategoryPage: FC<CategoryPageProps> = ({
  category,
  categories,
  vacanciesInfo,
  initialData,
  formData,
  navUrlState,
  metadata
}) => {
  const metaTitle = useCallback(() => {
    return (
      getPageTitle(initialData.header, 'vacancies') +
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

        <meta name="description" content={metadata.description} />
        <meta property="og:description" content={metadata.description} />
      </Head>

      <Layout data={{ ...initialData, ...navUrlState }} categories={categories}>
        <Category
          mainData={{ ...initialData, formData, ...navUrlState }}
          category={category}
          vacanciesInfo={vacanciesInfo}
        />
      </Layout>
    </>
  );
};

export default CategoryPage;

export const getServerSideProps = async ({ locale, params }: GetServerSidePropsContext) => {
  const [header, footer, vacancies, formData, categories, category, vacanciesInfo] =
    await Promise.all([
      getHeaderData(locale!),
      getFooterData(locale!),
      getAllVacancies(locale!),
      getFormData(locale!),
      getCategories(locale!),
      getCategoryBySlug(locale!, params?.category as string),
      getVacancyListData(locale!),
    ]);

  if (!locale || !params?.category || !categories || !category || !vacanciesInfo) {
    return { notFound: true };
  }

  return {
    props: {
      initialData: { header, footer, vacancies },
      formData,
      category,
      categories,
      vacanciesInfo,
    },
  };
};
