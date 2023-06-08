import { FC, useRef } from 'react';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getFormData,
  getHeaderData,
} from '@/services';
import { ICategory } from '@/shared/types/CategoriesTypes';
import { IVacancy } from '@/shared/types/VacanciesTypes';
import { IFooterData } from '@/shared/types/FooterTypes';
import { IHeader, IMenu } from '@/shared/types/HeaderTypes';
import { GetServerSidePropsContext } from 'next';
import { getAboutData } from '@/services/AboutService';
import { IAbout } from '@/shared/types/AboutTypes';
import { AboutUs } from '@/components/AboutUs';
import MainForm from '@/components/MainForm/MainForm';
import type { IFormData } from '@/shared/types/FormTypes';
import { Specializations } from '@/components/Specializations';

type Props = {
  categories: ICategory[];
  vacancies: IVacancy[];
  footerData: IFooterData;
  header: IHeader;
  about: IAbout;
  formData: IFormData;
};

const About: FC<Props> = ({ categories, vacancies, footerData, header, about, formData }) => {
  const pageTitle = header.menu.find(({ path_id }: IMenu) => path_id === 'about')?.title!;
  const formRef = useRef<HTMLElement>(null);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={about.WhatWeDoTitle} />
      </Head>

      <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
        <AboutUs about={about} pageTitle={pageTitle} formRef={formRef} />
        <Specializations about={about} categories={categories} />
        <MainForm
          imageCatProps={header?.mainCat.data.attributes.url}
          formData={formData}
          formRef={formRef}
        />
      </Layout>
    </>
  );
};

export default About;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const fetchCategories: Promise<ICategory[]> = getCategories(locale!);
  const fetchVacancies: Promise<IVacancy[]> = getAllVacancies(locale!);
  const fetchFooterData: Promise<IFooterData> = getFooterData(locale!);
  const fetchHeader: Promise<IHeader> = getHeaderData(locale!);
  const fetchAbout: Promise<IAbout> = getAboutData(locale!);
  const fetchFormData = getFormData(locale!);

  const [categories, vacancies, footerData, header, about, formData] = await Promise.all([
    fetchCategories,
    fetchVacancies,
    fetchFooterData,
    fetchHeader,
    fetchAbout,
    fetchFormData,
  ]);

  return {
    props: {
      categories,
      vacancies,
      footerData,
      header,
      about,
      formData,
    },
  };
};
