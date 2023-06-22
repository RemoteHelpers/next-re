import { FC, useCallback } from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { Layout } from '@/components/Layout';
import { Contacts } from '@/components/Contacts';
import {
  getContactData,
  getCategories,
  getHeaderData,
  getFooterData,
  getAllVacancies,
  getFormData,
} from '@/services';
import type { IMainData, ICategory, IContacts } from '@/shared/types';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';

type Props = { categories: ICategory[]; contacts: IContacts; mainData: IMainData };
const ContactsPage: FC<Props> = ({ categories, contacts, mainData }) => {
  const { header, formData } = mainData;
  const metaTitle = useCallback(() => getPageTitle(header, 'contacts'), [header]);
  return (
    <>
      <Head>
        <title>{metaTitle() + titleCompanyInfo}</title>
        <meta property="og:title" content={metaTitle()} />
      </Head>

      <Layout categories={categories} initialData={mainData}>
        <Contacts contactsData={contacts} header={header} formData={formData} />
      </Layout>
    </>
  );
};

export default ContactsPage;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  // const categories = await getCategories(locale!);
  // const contacts = await getContactData(locale!);
  const [header, footer, vacancies, formData, categories, contacts] = await Promise.all([
    getHeaderData(locale!),
    getFooterData(locale!),
    getAllVacancies(locale!),
    getFormData(locale!),
    getCategories(locale!),
    getContactData(locale!),
  ]);

  return {
    props: {
      mainData: {
        header,
        footer,
        vacancies,
        formData,
      },
      categories,
      contacts,
    },
  };
};
