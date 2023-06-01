import { FC, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';
import { ICategory } from '@/shared/types/CategoriesTypes';
import { IVacancy } from '@/shared/types/VacanciesTypes';
import { IFooterData } from '@/shared/types/FooterTypes';
import { IHeader } from '@/shared/types/HeaderTypes';
import { GetServerSidePropsContext } from 'next';
import { getAboutData } from '@/services/AboutService';
import { IAbout } from '@/shared/types/AboutTypes';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  categories: ICategory[];
  vacancies: IVacancy[];
  footerData: IFooterData;
  header: IHeader;
  about: IAbout;
};

const About: FC<Props> = ({ categories, vacancies, footerData, header, about }) => {
  return (
    <>
      <Head>
        <title>{about.title}</title>
        <meta name="description" content={about.WhatWeDoTitle} />
      </Head>
      <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
        <h1>{about.title}</h1>
      </Layout>
    </>
  );
};

export default About;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const fetchCategories = getCategories(locale!) as Promise<ICategory[]>;
  const fetchVacancies = getAllVacancies(locale!) as Promise<IVacancy[]>;
  const fetchFooterData = getFooterData(locale!) as Promise<IFooterData>;
  const fetchHeader = getHeaderData(locale!) as Promise<IHeader>;
  const fetchAbout: Promise<IAbout> = getAboutData(locale!);

  const [categories, vacancies, footerData, header, about] = await Promise.all([
    fetchCategories,
    fetchVacancies,
    fetchFooterData,
    fetchHeader,
    fetchAbout,
  ]);

  return {
    props: {
      categories,
      vacancies,
      footerData,
      header,
      about,
    },
  };
};
