import { FC } from 'react';
import { Layout } from '@/components/Layout';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getFormData,
  getHeaderData,
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
  vacancies,
  footerData,
  formData,
  header,
}) => {
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      <VacanciesHero vacancyPageData={vacancyPageData} />
      <Vacancies vacanciesInfo={vacanciesInfo} categories={categories} vacancies={vacancies} />
      <VacanciesForm formData={formData}/>
    </Layout>
  );
};

export default VacanciesPage;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale;
  const vacanciesInfo = await getVacancyListData(lang);
  const vacancyPageData = await getVacancyPageData(lang);
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const formData = await getFormData(lang);
  const header = await getHeaderData(lang);
  return {
    props: {
      vacanciesInfo,
      vacancyPageData,
      categories,
      vacancies,
      footerData,
      formData,
      header,
    },
  };
};
