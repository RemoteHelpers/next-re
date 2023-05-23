import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';

const About: FC<any> = ({ categories, vacancies, footerData, header }) => {
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      <h1>About Page</h1>
    </Layout>
  );
};

export default About;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale;
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const header = await getHeaderData(lang);
  return {
    props: {
      categories,
      vacancies,
      footerData,
      header,
    },
  };
};
