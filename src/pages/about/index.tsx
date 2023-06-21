import { FC, useRef, useCallback } from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getCategories, getAboutData } from '@/services';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
import { Layout } from '@/components/Layout';
import { AboutUs } from '@/components/AboutUs';
import { Specializations } from '@/components/Specializations';
import MainForm from '@/components/MainForm/MainForm';
import type { IAboutData, ICategory, IMainData } from '@/shared/types';

type Props = {
  categories: ICategory[];
  about: IAboutData;
  mainData: IMainData;
};
const About: FC<Props> = ({ categories, about, mainData }) => {
  const formRef = useRef<HTMLElement>(null);
  const { header, formData } = mainData;
  const pageTitle = useCallback(() => getPageTitle(header, 'about'), [header]);

  return (
    <>
      <Head>
        <title>{pageTitle() + titleCompanyInfo}</title>
        <meta name="description" content={about.WhatWeDoTitle} />
        <meta property="og:title" content={pageTitle() + titleCompanyInfo} />
        <meta property="og:description" content={about.WhatWeDoTitle} />
      </Head>

      <Layout categories={categories} mainData={mainData}>
        <AboutUs about={about} pageTitle={pageTitle()} formRef={formRef} />
        <Specializations about={about} categories={categories} />
        <MainForm
          formData={formData}
          imageCatProps={header?.mainCat.data.attributes.url}
          formRef={formRef}
        />
      </Layout>
    </>
  );
};

export default About;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const fetchCategories: Promise<ICategory[]> = getCategories(locale!);
  const fetchAbout: Promise<IAboutData> = getAboutData(locale!);
  const [categories, about] = await Promise.all([fetchCategories, fetchAbout]);
  return {
    props: {
      categories,
      about,
    },
  };
};
