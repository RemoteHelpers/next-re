import { FC, useRef, useCallback } from 'react';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { getCategories } from '@/services';
import type { GetServerSidePropsContext } from 'next';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IAbout } from '@/shared/types/AboutTypes';
import { getAboutData } from '@/services/AboutService';
import { AboutUs } from '@/components/AboutUs';
import MainForm from '@/components/MainForm/MainForm';
import { Specializations } from '@/components/Specializations';
import type { IMainData } from '@/shared/types/GlobalTypes';
import { getPageTitle } from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';

type Props = {
  categories: ICategory[];
  about: IAbout;
  greetings: string;
  mainData: IMainData;
};
const About: FC<Props> = ({ categories, about, greetings, mainData }) => {
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
        <AboutUs about={about} pageTitle={greetings || pageTitle()} formRef={formRef} />
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
  const fetchAbout: Promise<IAbout> = getAboutData(locale!);
  const [categories, about] = await Promise.all([fetchCategories, fetchAbout]);
  return {
    props: {
      categories,
      about,
    },
  };
};
