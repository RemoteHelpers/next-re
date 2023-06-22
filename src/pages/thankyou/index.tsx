import { FC } from 'react';
import { Layout } from '@/components/Layout';
import { Thankyou } from '@/components/Thankyou';
import { getAllVacancies, getFooterData, getHeaderData, getThankyouData } from '@/services';
import { getCategories } from '@/services';
import { ICategory, IInitialData } from '@/shared/types';
import { GetServerSidePropsContext } from 'next';

type Props = { categories: ICategory[]; thankyouData: any; initialData: IInitialData };
const ContactsPage: FC<Props> = ({ categories, thankyouData, initialData }) => {
  return (
    <Layout initialData={initialData} categories={categories}>
      <Thankyou thankyouData={thankyouData} />
    </Layout>
  );
};

export default ContactsPage;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  //	const lang = context.locale;
  //	const categories = await getCategories(lang);
  // 	const thankyouData = await getThankyouData(lang);
  const [header, footer, vacancies, categories, thankyouData] = await Promise.all([
    getHeaderData(locale!),
    getFooterData(locale!),
    getAllVacancies(locale!),
    getCategories(locale!),
    getThankyouData(locale!),
  ]);

  return {
    props: {
      initialData: {
        header,
        footer,
        vacancies,
      },
      categories,
      thankyouData,
    },
  };
};
