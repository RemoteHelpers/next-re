import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { Vacancy } from '@/components/Vacancy';
import { getCategoryBySlug, getFormData, getVacancy, getVacancyListData } from '@/services';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IVacanciesInfo, IVacancy } from '@/shared/types/VacanciesTypes';
import type { IFooterData } from '@/shared/types/FooterTypes';
import type { IHeader } from '@/shared/types/HeaderTypes';
import type { IFormData } from '@/shared/types/FormTypes';
import { GetServerSidePropsContext } from 'next';
import { VacancyNew } from '@/components/VacancyNew';
import Head from 'next/head';

type Props = {
  categories: ICategory[];
  vacancies: IVacancy[];
  footerData: IFooterData;
  header: IHeader;
  vacancy: IVacancy;
  vacanciesInfo: IVacanciesInfo;
  category: ICategory;
  formData: IFormData;
};

const VacancyPage: FC<Props> = ({
  categories,
  vacancies,
  footerData,
  header,
  vacancy,
  vacanciesInfo,
  category,
  formData,
}) => {
  const { seoData, title, cardDescription, newVersion } = vacancy.attributes;

  return (
    <>
      <Head>
        <title>{seoData ? seoData.seoTitle : `${title} - Remote Employees`}</title>
        <meta name="description" content={seoData ? seoData.seoDescription : cardDescription} />
      </Head>

      <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
        {newVersion ? (
          <VacancyNew
            vacancy={vacancy}
            vacanciesInfo={vacanciesInfo}
            category={category}
            formData={formData}
            header={header}
          />
        ) : (
          <Vacancy
            vacancy={vacancy}
            vacanciesInfo={vacanciesInfo}
            category={category}
            formData={formData}
            header={header}
          />
        )}
      </Layout>
    </>
  );
};

export default VacancyPage;

export const getServerSideProps = async ({ params, locale }: GetServerSidePropsContext) => {
  // const vacancySlug = params?.vacancy.at(-1);
  const [categorySlug, vacancySlug] = params?.vacancy!;
  /* queries for layout */
  const categories = await getCategories(locale!);
  const vacancies = await getAllVacancies(locale!);
  const footerData = await getFooterData(locale!);
  const header = await getHeaderData(locale!);
  /* queries for vacancy */
  const vacancy = await getVacancy(locale!, vacancySlug);
  const vacanciesInfo = await getVacancyListData(locale!);
  const category = await getCategoryBySlug(locale!, categorySlug);
  const formData = await getFormData(locale!);

  return {
    props: {
      categories,
      vacancies,
      footerData,
      header,
      vacancy,
      vacanciesInfo,
      category,
      formData,
    },
  };
};
