import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { Vacancy } from '@/components/Vacancy';
import { getCategoryBySlug, getFormData, getVacancy, getVacancyListData } from '@/services';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';

const VacancyPage: FC<any> = ({
  categories,
  vacancies,
  footerData,
  header,
  vacancy,
  vacanciesInfo,
  category,
  formData,
}) => {
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      <Vacancy
        vacancy={vacancy}
        vacanciesInfo={vacanciesInfo}
        category={category}
        formData={formData}
        header={header}
      />
    </Layout>
  );
};

export default VacancyPage;

export const getServerSideProps = async (context: any) => {
  const params = context.params;
  // const vacancySlug = params?.vacancy.at(-1);
  const [categorySlug, vacancySlug] = params?.vacancy;
  const lang = context.locale;
  /* queries for layout */
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const header = await getHeaderData(lang);
  /* queries for vacancy */
  const vacancy = await getVacancy(lang, vacancySlug);
  const vacanciesInfo = await getVacancyListData(lang);
  const category = await getCategoryBySlug(lang, categorySlug);
  const formData = await getFormData(lang);
  return {
    props: {
      categories,
      vacancies,
      footerData,
      header,
      vacancy,
      vacanciesInfo,
      category,
      formData,
    },
  };
};
