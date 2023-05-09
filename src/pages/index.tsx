import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { Vacancies } from '@/components/Vacancies';
import { getVacancyListData, getCategories, getAllVacancies, getHomeData } from '@/services';
import { Questions } from '@/components/Questions';
import Testimonials from '@/components/Testimonials/Testimonials';
import { Hero } from '@/components/Hero';

const Home: FC = ({ vacanciesInfo, categories, vacancies, homeData }: any) => {
  return (
    <>
      <Layout>
        <Hero data={homeData} />
        <Vacancies vacanciesInfo={vacanciesInfo} categories={categories} vacancies={vacancies} />
        <Questions questions={homeData} />
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

  return {
    props: {
      vacanciesInfo,
      categories,
      vacancies,
      homeData,
    },
  };
};
