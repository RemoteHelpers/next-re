import { FC } from 'react';
import { Layout } from '@/components/Layout';
import {
  getCategories,
  getVacancyListData,
  getVacancyPageData,
} from '@/services';
import { Vacancies } from '@/components/Vacancies';
import { VacanciesHero } from '@/components/Vacancies/components/VacanciesHero/VacanciesHero';
import { VacanciesForm } from '@/components/Vacancies/components/VacanciesForm';

const VacanciesPage: FC<any> = ({
  vacanciesInfo,
  vacancyPageData,
  categories,
}) => {
  return (
    <Layout categories={categories}>
      <VacanciesHero vacancyPageData={vacancyPageData} />
      <Vacancies vacanciesInfo={vacanciesInfo} categories={categories} />
      <VacanciesForm />
    </Layout>
  );
};

export default VacanciesPage;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale;
  const vacanciesInfo = await getVacancyListData(lang);
  const vacancyPageData = await getVacancyPageData(lang);
  const categories = await getCategories(lang);
  return {
    props: {
      vacanciesInfo,
      vacancyPageData,
      categories,
    },
  };
};
