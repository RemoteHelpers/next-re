import { FC, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import type {
  IHomeData,
  ICategory,
  IVacanciesInfo,
  IFormData,
  INavUrlState,
  IInitialData,
  IMetadata,
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
  vacanciesInfo,
  categories,
  homeData,
  initialData,
  formData,
  navUrlState,
  metadata,
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
      </Head>

      <Layout categories={categories} data={{ ...initialData, ...navUrlState }}>
        <div style={{ width: '100%', display: 'flex' }}>
            <iframe
              src="https://module3.rhelpers.com/"
              title="app"
              style={{
                width: '90%',
                height: '700px',
                margin: '2rem auto',
                borderRadius: '20px',
                border: '1px solid #616161',
              }}
            ></iframe>
        </div>
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
