import { FC, useRef } from 'react';
import type { GetServerSidePropsContext } from 'next';
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
  getFormData,
  getHeaderData,
} from '@/services';
import { Spheres } from '@/components/Spheres';
import { Partners } from '@/components/Partners';
import MainForm from '@/components/MainForm/MainForm';
import type { IVacanciesInfo, IVacancy } from '@/shared/types/VacanciesTypes';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IHeader } from '@/shared/types/HeaderTypes';
import type { IHomeData } from '@/shared/types/HomeTypes';
import type { IFormData } from '@/shared/types/FormTypes';
import type { IFooterData } from '@/shared/types/FooterTypes';

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  vacancies: IVacancy[];
  homeData: IHomeData;
  footerData: IFooterData;
  header: IHeader;
  formData: IFormData;
};

const Home: FC<Props> = ({
  vacanciesInfo,
  categories,
  vacancies,
  homeData,
  footerData,
  header,
  formData,
}) => {
  const formRef = useRef<HTMLElement>(null);

  return (
    <>
      <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
        <Hero data={homeData} formRef={formRef} />
        <Spheres title={homeData.spheresTitle} categories={categories} />
        <Vacancies vacanciesInfo={vacanciesInfo} categories={categories} vacancies={vacancies} />
        <Questions questions={homeData} />
        <Partners title={homeData.partnersTitle} slides={homeData.partnersSlider.data} />
        <Testimonials testimonials={homeData} />
        <MainForm formData={formData} imageCatProps={header?.mainCat.data.attributes.url} formRef={formRef} />
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const lang = context.locale!;
  const vacanciesInfo = await getVacancyListData(lang);
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const homeData = await getHomeData(lang);
  const footerData = await getFooterData(lang);
  const formData = await getFormData(lang);
  const header = await getHeaderData(lang);

  if (!lang || !vacanciesInfo || !categories || !vacancies || !homeData || !footerData || !formData || !header) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      vacanciesInfo,
      categories,
      vacancies,
      homeData,
      footerData,
      formData,
      header,
    },
  };
};
