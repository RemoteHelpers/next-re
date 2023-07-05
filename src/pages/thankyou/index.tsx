import { FC } from 'react';
import { GetServerSidePropsContext } from 'next';
import type { ICategory, IInitialData, INavUrlState, IThankYouData } from '@/shared/types';
import { getCategories } from '@/services';
import { Layout } from '@/components/Layout';
import { Thankyou } from '@/components/Thankyou';
import { getAllVacancies, getFooterData, getHeaderData, getThankYouData } from '@/services';

type Props = {
  categories: ICategory[];
  thankYouData: IThankYouData;
  initialData: IInitialData;
  navUrlState: INavUrlState;
};
const ContactsPage: FC<Props> = ({ categories, thankYouData, initialData, navUrlState }) => {
  return (
    <Layout data={{ ...initialData, ...navUrlState }} categories={categories}>
      <Thankyou thankyouData={thankYouData} />
    </Layout>
  );
};

export default ContactsPage;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  //	const lang = context.locale;
  //	const categories = await getCategories(lang);
  // 	const thankyouData = await getThankyouData(lang);
  const [header, footer, vacancies, categories, thankYouData] = await Promise.all([
    getHeaderData(locale!),
    getFooterData(locale!),
    getAllVacancies(locale!),
    getCategories(locale!),
    getThankYouData(locale!),
  ]);

  return {
    props: {
      initialData: {
        header,
        footer,
        vacancies,
      },
      categories,
      thankYouData,
    },
  };
};
