import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { Vacancy } from '@/components/Vacancy';
import { getVacancy } from '@/services';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';
import Head from 'next/head';

const VacancyPage: FC<any> = ({ vacancy, categories, vacancies, footerData, header }) => {
  return (
    <>
      <Head>
        <title>{vacancy.title}</title>
        <meta name="description" content={vacancy.cardDescription} />
      </Head>
      <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
        <Vacancy vacancy={vacancy} />
      </Layout>
    </>
  );
};

export default VacancyPage;

export const getServerSideProps = async (context: any) => {
  const params = context.params;
  const slug = params?.vacancy?.slice(1)[0];
  const lang = context.locale;
  const vacancy = await getVacancy(lang, slug);
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const header = await getHeaderData(lang);
  return {
    props: {
      vacancy,
      categories,
      vacancies,
      footerData,
      header,
    },
  };
};
