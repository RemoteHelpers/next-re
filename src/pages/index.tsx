import { FC, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import type { IHomeData, ICategory, IVacanciesInfo, IFormData, INavUrlState, IInitialData, IMetadata } from '@/shared/types';
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
import Hero from '@/components/Hero/Hero';
const Vacancies = dynamic(() => import('@/components/Vacancies/Vacancies'));
const Questions = dynamic(() => import('@/components/Questions/Questions'));
const Spheres = dynamic(() => import('@/components/Spheres/Spheres'));
const Partners = dynamic(() => import('@/components/Partners/Partners'));
const Testimonials = dynamic(() => import('@/components/Testimonials/Testimonials'));
const MainForm = dynamic(() => import('@/components/MainForm/MainForm'));

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  homeData: IHomeData;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
  metadata: IMetadata;
};

const Home: FC<Props> = ({ 
  vacanciesInfo, categories, homeData, initialData, formData, navUrlState, metadata,
}) => {
  const formRef = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <link rel="canonical" href={metadata.url} />
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

  if (!locale || !vacanciesInfo || !categories || !homeData) return { notFound: true };

  return {
    props: {
      initialData: { header, footer, vacancies },
      formData,
      vacanciesInfo,
      categories,
      homeData,
    },
  };
};
