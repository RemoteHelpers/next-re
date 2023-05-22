import { FC } from 'react';
import { Layout } from '@/components/Layout';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getHeaderData,
  getCategoryBySlug,
} from '@/services';
import { Category } from '@/components/Category';

const VacancyPage: FC<any> = ({ category, categories, vacancies, footerData, header }) => {
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      <Category category={category} header={header} />
    </Layout>
  );
};

export default VacancyPage;

export const getServerSideProps = async (context: any) => {
  const params = context.params;
  const categorySlug = params?.category;
  const lang = context.locale;
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const category = await getCategoryBySlug(categorySlug, lang);
  const header = await getHeaderData(lang);
  return {
    props: {
      category,
      categories,
      vacancies,
      footerData,
      header,
    },
  };
};
