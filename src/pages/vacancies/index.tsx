import { FC } from 'react';
import { Layout } from '@/components/Layout';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getHeaderData,
  getHomeData,
  getVacancyListData,
} from '@/services';
import { Vacancies } from '@/components/Vacancies';
import type { GetServerSidePropsContext } from 'next';

const VacanciesPage: FC<any> = ({
  vacanciesInfo,
  categories,
  vacancies,
  homeData,
  footerData,
  header,
}) => {
  console.log('vacanciesInfo', vacanciesInfo.title);
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      <Vacancies vacanciesInfo={vacanciesInfo} categories={categories} vacancies={vacancies} />
    </Layout>
  );
};

export default VacanciesPage;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  // const lang = context.locale;
  // const vacanciesInfo = await getVacancyListData(lang);
  // const categories = await getCategories(lang);
  // const vacancies = await getAllVacancies(lang);
  // const homeData = await getHomeData(lang);
  // const footerData = await getFooterData(lang);
  // const header = await getHeaderData(lang);
  const fetchVacanciesInfo = getVacancyListData(locale!);
  const fetchCategories = getCategories(locale!);
  const fetchVacancies = getAllVacancies(locale!);
  const fetchHomeData = getHomeData(locale!);
  const fetchFooterData = getFooterData(locale!);
  const fetchHeader = getHeaderData(locale!);
  const [vacanciesInfo, categories, vacancies, homeData, footerData, header] = await Promise.all([
    fetchVacanciesInfo,
    fetchCategories,
    fetchVacancies,
    fetchHomeData,
    fetchFooterData,
    fetchHeader,
  ]);

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
