import { FC, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { GetServerSidePropsContext } from 'next';
import type { IAboutData, ICategory, IFormData, IInitialData, IMetadata, INavUrlState } from '@/shared/types';
import {
  getCategories,
  getAboutData,
  getHeaderData,
  getFooterData,
  getAllVacancies,
  getFormData,
} from '@/services';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
import { Layout } from '@/components/Layout';
const AboutUs = dynamic(() => import('@/components/AboutUs/AboutUs'));
const Specializations = dynamic(() => import('@/components/Specializations/Specializations'));
const MainForm = dynamic(() => import('@/components/MainForm/MainForm'));

type Props = {
  categories: ICategory[];
  about: IAboutData;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
  metadata: IMetadata;
};
const About: FC<Props> = ({ categories, about, initialData, formData, navUrlState, metadata }) => {
  const formRef = useRef<HTMLElement>(null);
  const pageTitle = useCallback(() => getPageTitle(initialData.header, 'about'),
    [initialData.header]
  );

  return (
    <>
      <Head>
        <title>{pageTitle() + titleCompanyInfo}</title>
        <meta name="description" content={about.WhatWeDoTitle} />
        <meta property="og:title" content={pageTitle() + titleCompanyInfo} />
        <meta property="og:description" content={about.WhatWeDoTitle} />
        <link rel="canonical" href={metadata.url + useRouter().asPath.substring(1)} />
      </Head>

      <Layout categories={categories} data={{ ...initialData, ...navUrlState }}>
        <AboutUs about={about} pageTitle={pageTitle()} formRef={formRef} />
        <Specializations about={about} categories={categories} navUrlState={navUrlState} />
        <MainForm
          formData={formData}
          imageCatProps={initialData.header?.mainCat.data.attributes.url}
          formRef={formRef}
        />
      </Layout>
    </>
  );
};

export default About;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const [header, footer, vacancies, formData, categories, about] = await Promise.all([
    getHeaderData(locale!),
    getFooterData(locale!),
    getAllVacancies(locale!),
    getFormData(locale!),
    getCategories(locale!),
    getAboutData(locale!),
  ]);

  return {
    props: {
      initialData: { header, footer, vacancies },
      formData,
      categories,
      about,
    },
  };
};
