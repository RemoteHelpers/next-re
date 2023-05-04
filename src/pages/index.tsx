import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { CurrentVacancies } from '@/components/CurrentVacancies';
import { getVacancyListData, getCategories, getCurrentVacancies } from '@/services';

const Home: FC = ({ vacanciesData, categories, vacancies }: any) => {
  return (
    <>
      <Layout>
        <CurrentVacancies
          vacanciesData={vacanciesData}
          categories={categories}
          vacancies={vacancies}
        />
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale === 'ua' ? 'uk' : context.locale;
  const vacanciesData = await getVacancyListData(lang);
  const categories = await getCategories(lang);
  const vacancies = await getCurrentVacancies({ lang, pageStart: 0, perPage: 111 });

  return {
    props: {
      vacanciesData,
      categories,
      vacancies,
    },
  };
};
