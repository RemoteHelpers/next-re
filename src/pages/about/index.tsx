import { FC, useContext, useRef, useCallback } from 'react';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { getCategories } from '@/services';
import type { GetServerSidePropsContext } from 'next';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IMenu } from '@/shared/types/HeaderTypes';
import type { IAbout } from '@/shared/types/AboutTypes';
import { getAboutData } from '@/services/AboutService';
import { AboutUs } from '@/components/AboutUs';
import MainForm from '@/components/MainForm/MainForm';
import { Specializations } from '@/components/Specializations';
import { GlobalContext } from '@/context';
import { IFooterData } from '@/shared/types/FooterTypes';

type Props = {
  categories: ICategory[];
  about: IAbout;
  greetings: string;
  // footer: IFooterData;
  globalData: any;
};

const About: FC<Props> = ({ categories, about, greetings, globalData }) => {
  const formRef = useRef<HTMLElement>(null);
  const { header } = useContext(GlobalContext);
  const pageTitle = useCallback(() => {
    return header.menu.find(({ path_id }: IMenu) => path_id === 'about')?.title!;
  }, [header]);

  return (
    <>
      <Layout categories={categories} footer={globalData.footer} header={globalData.header}>
        <AboutUs about={about} pageTitle={greetings || pageTitle()} formRef={formRef} />
        <Specializations about={about} categories={categories} />
        <MainForm imageCatProps={header?.mainCat.data.attributes.url} formRef={formRef} />
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
