import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { getAllVacancies, getCategories, getFooterData, getHeaderData } from '@/services';
import { ICategory } from '@/shared/types/CategoriesTypes';
import { IVacancy } from '@/shared/types/VacanciesTypes';
import { IFooterData } from '@/shared/types/FooterTypes';
import { IHeader } from '@/shared/types/HeaderTypes';
import { GetServerSidePropsContext } from 'next';

type Props = {
  categories: ICategory[];
  vacancies: IVacancy[];
  footerData: IFooterData;
  header: IHeader;
};

const About: FC<Props> = ({ categories, vacancies, footerData, header }) => {
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      <h1>About Page</h1>
    </Layout>
  );
};

export default About;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const fetchCategories = getCategories(locale!) as Promise<ICategory[]>;
  const fetchVacancies = getAllVacancies(locale!) as Promise<IVacancy[]>;
  const fetchFooterData = getFooterData(locale!) as Promise<IFooterData>;
  const fetchHeader = getHeaderData(locale!) as Promise<IHeader>;

  const [categories, vacancies, footerData, header] = await Promise.all([
    fetchCategories,
    fetchVacancies,
    fetchFooterData,
    fetchHeader,
  ]);

  return {
    props: {
      categories,
      vacancies,
      footerData,
      header,
    },
  };
};
