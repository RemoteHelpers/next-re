import { FC, useEffect, useRef } from 'react';
import type { GetServerSidePropsContext } from 'next';
import type {
  IHomeData,
  ICategory,
  IVacanciesInfo,
  IFormData,
  INavUrlState,
  IInitialData,
} from '@/shared/types';
import { Layout } from '@/components/Layout';
import { Vacancies } from '@/components/Vacancies';
import { Questions } from '@/components/Questions';
import Testimonials from '@/components/Testimonials/Testimonials';
import { Hero } from '@/components/Hero';
import {
  getVacancyListData,
  getCategories,
  getHomeData,
  getAllVacancies,
  getFooterData,
  getFormData,
  getHeaderData,
} from '@/services';
import { Spheres } from '@/components/Spheres';
import { Partners } from '@/components/Partners';
import MainForm from '@/components/MainForm/MainForm';

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  homeData: IHomeData;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
};

const Home: FC<Props> = ({
  vacanciesInfo,
  categories,
  homeData,
  initialData,
  formData,
  navUrlState,
}) => {
  const formRef = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Layout categories={categories} data={{ ...initialData, ...navUrlState }}>
        <Hero data={homeData} formRef={formRef} />
        <Spheres title={homeData.spheresTitle} categories={categories} navUrlState={navUrlState} />
        <Vacancies
          navUrlState={navUrlState}
          vacanciesInfo={vacanciesInfo}
          categories={categories}
          vacancies={initialData.vacancies}
        />
        <Questions questions={homeData} />
        <Partners title={homeData.partnersTitle} slides={homeData.partnersSlider.data} />
        <Testimonials testimonials={homeData} />
        <MainForm
          formRef={formRef}
          imageCatProps={initialData.header.mainCat?.data?.attributes?.url}
          formData={formData}
        />
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  // const lang = context.locale!;
  // const vacanciesInfo = await getVacancyListData(lang);
  // const categories = await getCategories(lang, 'categorySlug,categoryTitle');
  // const homeData = await getHomeData(
  //   lang,
  //   'Testimonials.personImg,Faq_Question,partnersSlider,heroStats.heroStatIcon'
  // );
  const [header, footer, vacancies, formData, vacanciesInfo, categories, homeData] =
    await Promise.all([
      getHeaderData(locale!),
      getFooterData(locale!),
      getAllVacancies(locale!),
      getFormData(locale!),
      getVacancyListData(locale!),
      getCategories(locale!, 'categorySlug,categoryTitle'),
      getHomeData(
        locale!,
        'Testimonials.personImg,Faq_Question,partnersSlider,heroStats.heroStatIcon'
      ),
    ]);

  if (!locale || !vacanciesInfo || !categories || !homeData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      initialData: {
        header,
        footer,
        vacancies,
      },
      formData,
      vacanciesInfo,
      categories,
      homeData,
    },
  };
};
