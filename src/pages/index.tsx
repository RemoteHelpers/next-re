import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { CurrentVacancies } from '@/components/CurrentVacancies';
import { getVacancyListData, getCategories, getAllVacancies, getHomeData } from '@/services';
import { Questions } from "@/components/Questions";
import { Hero } from "@/components/Hero";

const Home: FC = ({ vacanciesInfo, categories, vacancies, homeData }: any) => {
  return (
    <>
      <Layout>
        <Hero data={homeData} />				
        <CurrentVacancies
          vacanciesInfo={vacanciesInfo}
          categories={categories}
          vacancies={vacancies}
        />
        <Questions questions={homeData} />
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
