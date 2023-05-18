import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { Vacancies } from '@/components/Vacancies';
import { Questions } from '@/components/Questions';
import Testimonials from '@/components/Testimonials/Testimonials';
import { Hero } from '@/components/Hero';
import {
  getVacancyListData,
  getCategories,
  getAllVacancies,
  getHomeData,
  getFooterData,
  getHeaderData,
} from '@/services';
import { Spheres } from '@/components/Spheres';
import { Partners } from '@/components/Partners';

const Home: FC = ({ vacanciesInfo, categories, vacancies, homeData, footerData, navData }: any) => {
  return (
    <>
      <Layout footerData={footerData} headerData={{ navData, categories, vacancies }}>
        <Hero data={homeData} />
        <Spheres title={homeData.spheresTitle} categories={categories} />
        <Vacancies vacanciesInfo={vacanciesInfo} categories={categories} vacancies={vacancies} />
        <Questions questions={homeData} />
        <Partners title={homeData.partnersTitle} slides={homeData.partnersSlider.data} />
        <Testimonials testimonials={homeData} />
      </Layout>
    </>
  );
};

export default Home;

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
