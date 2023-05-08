import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { CurrentVacancies } from '@/components/CurrentVacancies';
import { getVacancyListData, getCategories, getAllVacancies } from '@/services';

const Home: FC = ({ vacanciesInfo, categories, vacancies }: any) => {
  return (
    <>
      <Layout>
        <CurrentVacancies
          vacanciesInfo={vacanciesInfo}
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
  const vacanciesInfo = await getVacancyListData(lang);
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);

  return {
    props: {
      vacanciesInfo,
      categories,
      vacancies,
    },
  };
};
