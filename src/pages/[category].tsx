import { FC } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { getCategories, getCategoryBySlug, getVacancyListData } from '@/services';
import { Layout } from '@/components/Layout';
import { Category } from '@/components/Category';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IVacanciesInfo } from '@/shared/types/VacanciesTypes';
import type { IMainData } from '@/shared/types/GlobalTypes';

interface CategoryPageProps {
  category: ICategory;
  categories: ICategory[];
  vacanciesInfo: IVacanciesInfo;
  mainData: IMainData;
}

const CategoryPage: FC<CategoryPageProps> = ({ category, categories, vacanciesInfo, mainData }) => {
  return (
    <Layout mainData={mainData} categories={categories}>
      <Category mainData={mainData} category={category} vacanciesInfo={vacanciesInfo} />
    </Layout>
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
