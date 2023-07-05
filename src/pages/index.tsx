import { FC, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import type {
  IHomeData,
  ICategory,
  IVacanciesInfo,
  IFormData,
  INavUrlState,
  IInitialData,
  LocalesLiteral,
} from '@/shared/types';
import {
  getVacancyListData,
  getCategories,
  getHomeData,
  getAllVacancies,
  getFooterData,
  getFormData,
  getHeaderData,
} from '@/services';
import { Layout } from '@/components/Layout';
import { Vacancies } from '@/components/Vacancies';
import { Questions } from '@/components/Questions';
import { Hero } from '@/components/Hero';
import { Spheres } from '@/components/Spheres';
import { Partners } from '@/components/Partners';
import Testimonials from '@/components/Testimonials/Testimonials';
import MainForm from '@/components/MainForm/MainForm';
import { appMetadata } from '@/api/metadata';

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
  const appMeta = appMetadata[useRouter().locale as LocalesLiteral];
  const formRef = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Head>
        <title>{appMeta.title}</title>
        <meta name="description" content={appMeta.description} />
        <meta property="og:title" content={appMeta.og.title} />
        <meta property="og:description" content={appMeta.og.description} />
      </Head>

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
