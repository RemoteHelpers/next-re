import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { Vacancy } from '@/components/Vacancy';
import { getVacancy } from '@/services';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';

const VacancyPage: FC<any> = ({ vacancy, categories, vacancies, footerData, navData }) => {
  return (
    <Layout footerData={footerData} headerData={{ navData, categories, vacancies }}>
      <Vacancy vacancy={vacancy} />
    </Layout>
  );
};

export default VacancyPage;

export const getServerSideProps = async (context: any) => {
  const params = context.params;
  const slug = params?.vacancy?.slice(1)[0];
  const lang = context.locale === 'ua' ? 'uk' : context.locale;
  const vacancy = await getVacancy(lang, slug);
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const navData = await getHeaderData(lang);
  return {
    props: {
      vacancy,
      categories,
      vacancies,
      footerData,
      navData,
    },
  };
};
