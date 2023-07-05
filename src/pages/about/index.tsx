import { FC, useRef, useCallback } from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import type {
  IAboutData,
  ICategory,
  IFormData,
  IInitialData,
  IMainData,
  INavUrlState,
} from '@/shared/types';
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
import { AboutUs } from '@/components/AboutUs';
import { Specializations } from '@/components/Specializations';
import MainForm from '@/components/MainForm/MainForm';

type Props = {
  categories: ICategory[];
  about: IAboutData;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
};
const About: FC<Props> = ({ categories, about, initialData, formData, navUrlState }) => {
  const formRef = useRef<HTMLElement>(null);
  const pageTitle = useCallback(
    () => getPageTitle(initialData.header, 'about'),
    [initialData.header]
  );

  return (
    <>
      <Head>
        <title>{pageTitle() + titleCompanyInfo}</title>
        <meta name="description" content={about.WhatWeDoTitle} />
        <meta property="og:title" content={pageTitle() + titleCompanyInfo} />
        <meta property="og:description" content={about.WhatWeDoTitle} />
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
  // const fetchCategories: Promise<ICategory[]> = getCategories(locale!);
  // const fetchAbout: Promise<IAboutData> = getAboutData(locale!);
  // const [categories, about] = await Promise.all([fetchCategories, fetchAbout]);
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
      initialData: {
        header,
        footer,
        vacancies,
      },
      formData,
      categories,
      about,
    },
  };
};
