import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';

const VacancyPage: FC<any> = ({ category, categories, vacancies, footerData, navData }) => {
  return (
    <Layout footerData={footerData} headerData={{ navData, categories, vacancies }}>
      <h1>{category}</h1>
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
  const footerData = await getFooterData(lang);
  const navData = await getHeaderData(lang);
  return {
    props: {
      category: categorySlug,
      categories,
      vacancies,
      footerData,
      navData,
    },
  };
};
