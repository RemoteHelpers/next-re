import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { CurrentVacancies } from '@/components/CurrentVacancies';
import { getVacancyListData } from '@/services';

const Home: FC = ({ vacanciesData }: any) => {
  return (
    <>
      <Layout>
        <CurrentVacancies vacanciesData={vacanciesData} />
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale === 'ua' ? 'uk' : context.locale;
  const vacanciesData = await getVacancyListData(lang);

  return {
    props: {
      vacanciesData,
    },
  };
};
