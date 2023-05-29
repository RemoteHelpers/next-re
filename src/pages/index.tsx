import { FC, useRef } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { Layout } from '@/components/Layout';
import { Vacancies } from '@/components/Vacancies';
import { Questions } from '@/components/Questions';
import Testimonials from '@/components/Testimonials/Testimonials';
import { Hero } from '@/components/Hero';
import {
  getVacancyListData,
  getCategories,
  getAllVacancies,
  getHomeData,
  getFooterData,
  getFormData,
  getHeaderData,
} from '@/services';
import { Spheres } from '@/components/Spheres';
import { Partners } from '@/components/Partners';
import MainForm from '@/components/MainForm/MainForm';
import type { IVacanciesInfo, IVacancy } from '@/shared/types/VacanciesTypes';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IHeader } from '@/shared/types/HeaderTypes';
import type { IHomeData } from '@/shared/types/HomeTypes';
import type { IFormData } from '@/shared/types/FormTypes';
import type { IFooterData } from '@/shared/types/FooterTypes';
import Link from 'next/link';

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  vacancies: IVacancy[];
  homeData: IHomeData;
  footerData: IFooterData;
  header: IHeader;
  formData: IFormData;
  translations: any;
};

const Home: FC<Props> = ({
  vacanciesInfo,
  categories,
  vacancies,
  homeData,
  footerData,
  header,
  formData,
}) => {
  const formRef = useRef<HTMLElement>(null);

  return (
    <>
      <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
        <Link href="translation">To Testing Translation Page</Link>

        <Hero data={homeData} formRef={formRef} />
        <Spheres title={homeData.spheresTitle} categories={categories} />
        <Vacancies vacanciesInfo={vacanciesInfo} categories={categories} vacancies={vacancies} />
        <Questions questions={homeData} />
        <Partners title={homeData.partnersTitle} slides={homeData.partnersSlider.data} />
        <Testimonials testimonials={homeData} />
        <MainForm formData={formData} formRef={formRef} />
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  // const lang = context.locale!;
  // const vacanciesInfo = await getVacancyListData(lang);
  // const categories = await getCategories(lang);
  // const vacancies = await getAllVacancies(lang);
  // const homeData = await getHomeData(lang);
  // const footerData = await getFooterData(lang);
  // const formData = await getFormData(lang);
  // const header = await getHeaderData(lang);
  const fetchVacanciesInfo: Promise<IVacanciesInfo> = getVacancyListData(locale!);
  const fetchCategories = getCategories(locale!);
  const fetchVacancies = getAllVacancies(locale!);
  const fetchHomeData = getHomeData(locale!);
  const fetchFooterData = getFooterData(locale!);
  const fetchFormData = getFormData(locale!);
  const fetchHeader = getHeaderData(locale!);

  const [vacanciesInfo, categories, vacancies, homeData, footerData, formData, header] =
    await Promise.all([
      fetchVacanciesInfo,
      fetchCategories,
      fetchVacancies,
      fetchHomeData,
      fetchFooterData,
      fetchFormData,
      fetchHeader,
    ]);

  return {
    props: {
      vacanciesInfo,
      categories,
      vacancies,
      homeData,
      footerData,
      formData,
      header,
    },
  };
};
