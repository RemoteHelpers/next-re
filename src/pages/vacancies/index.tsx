import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { VacanciesList } from '@/components/VacanciesList';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getHeaderData,
  getHomeData,
  getVacancyListData,
} from '@/services';
import { Vacancies } from '@/components/Vacancies';

const VacanciesPage: FC<any> = ({
  vacanciesInfo,
  categories,
  vacancies,
  homeData,
  footerData,
  header,
}) => {
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      <Vacancies vacanciesInfo={vacanciesInfo} categories={categories} vacancies={vacancies} />
    </Layout>
  );
};

export default VacanciesPage;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale === 'ua' ? 'uk' : context.locale;
  const vacanciesInfo = await getVacancyListData(lang);
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const homeData = await getHomeData(lang);
  const footerData = await getFooterData(lang);
  const header = await getHeaderData(lang);
  return {
    props: {
      vacanciesInfo,
      categories,
      vacancies,
      homeData,
      footerData,
      header,
    },
  };
};
