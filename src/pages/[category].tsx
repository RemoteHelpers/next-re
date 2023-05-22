import { FC } from 'react';
import { Layout } from '@/components/Layout';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getHeaderData,
  getCategoryBySlug,
  getVacancyListData,
} from '@/services';
import { Category } from '@/components/Category';

const VacancyPage: FC<any> = ({ category, categories, vacancies, footerData, header, vacanciesInfo }) => {
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      <Category category={category} header={header} vacanciesInfo={vacanciesInfo} />
    </Layout>
  );
};

export default VacancyPage;

export const getServerSideProps = async (context: any) => {
  const params = context.params;
  const categorySlug = params?.category;
  const lang = context.locale === 'ua' ? 'uk' : context.locale;
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const vacanciesInfo = await getVacancyListData(lang);
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
      vacanciesInfo
    },
  };
};
