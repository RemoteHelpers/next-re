import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';

const About: FC<any> = ({ categories, vacancies, footerData, navData }) => {
  return (
    <Layout footerData={footerData} headerData={{ navData, categories, vacancies }}>
      <h1>About Page</h1>
    </Layout>
  );
};

export default About;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale === 'ua' ? 'uk' : context.locale;
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const navData = await getHeaderData(lang);
  return {
    props: {
      categories,
      vacancies,
      footerData,
      navData,
    },
  };
};
