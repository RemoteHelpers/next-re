import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { CurrentVacancies } from '@/components/CurrentVacancies';
import { getVacancyListData, getCategories, getCurrentVacancies } from '@/services';

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

  const perPage = 100;
  const pageStart = 0;
  const vacancies = (await getCurrentVacancies({ lang, pageStart, perPage })) as any;
  // const { total } = vacanciesList.meta.pagination;
  // const vacancies = [...vacanciesList];

  // if (total > perPage) {
  //   for (let i = 0; i < total; i += perPage) {}
  // }

  return {
    props: {
      vacanciesInfo,
      categories,
      vacancies,
    },
  };
};
