import { FC, useEffect, useRef } from 'react';
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
  getFormData,  
} from '@/services';
import { Spheres } from '@/components/Spheres';
import { Partners } from '@/components/Partners';
import MainForm from '@/components/MainForm/MainForm';
import type { IVacanciesInfo, IVacancy } from '@/shared/types/VacanciesTypes';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IHomeData } from '@/shared/types/HomeTypes';
import type { IFormData } from '@/shared/types/FormTypes';

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  vacancies: IVacancy[];
  homeData: IHomeData;
  formData: IFormData;
};

const Home: FC<Props> = ({
  vacanciesInfo,
  categories,
  vacancies,
  homeData,
  formData,
}) => {
  const formRef = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  return (
    <>
      <Layout headerData={{ categories, vacancies }}>
        <Hero data={homeData} formRef={formRef} />
        <Spheres title={homeData.spheresTitle} categories={categories} />
        <Vacancies vacanciesInfo={vacanciesInfo} categories={categories} vacancies={vacancies} />
        <Questions questions={homeData} />
        <Partners title={homeData.partnersTitle} slides={homeData.partnersSlider.data} />
        <Testimonials testimonials={homeData} />
        <MainForm formData={formData} formRef={formRef} />
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const lang = context.locale!;
  const vacanciesInfo = await getVacancyListData(lang);
  const categories = await getCategories(lang, 'categorySlug,categoryTitle');
  const vacancies = await getAllVacancies(lang);
  const homeData = await getHomeData(lang);
  const formData = await getFormData(lang);

  return {
    props: {
      vacanciesInfo,
      categories,
      vacancies,
      homeData,
      formData,
    },
  };
};
