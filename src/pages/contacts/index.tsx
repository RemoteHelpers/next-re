import { FC, useCallback } from 'react';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  getContactData,
  getCategories,
  getHeaderData,
  getFooterData,
  getAllVacancies,
  getFormData,
} from '@/services';
import type { ICategory, IContacts, IFormData, INavUrlState, IInitialData, IMetadata } from '@/shared/types';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
import { Layout } from '@/components/Layout';
const Contacts = dynamic(() => import('@/components/Contacts'));

type Props = {
  categories: ICategory[];
  contacts: IContacts;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
  metadata: IMetadata;
};
const ContactsPage: FC<Props> = ({ categories, contacts, initialData, metadata, formData, navUrlState, }) => {
  const { header } = initialData;
  const metaTitle = useCallback(() => getPageTitle(header, 'contacts'), [header]);

  return (
    <>
      <Head>
        <title>{metaTitle() + titleCompanyInfo}</title>
        <meta property="og:title" content={metaTitle()} />
        <meta name="description" content={metadata.description} />
        <meta property="og:description" content={metadata.description} />
      </Head>

      <Layout categories={categories} data={{ ...initialData, ...navUrlState }}>
        <Contacts contactsData={contacts} header={header} formData={formData} />
      </Layout>
    </>
  );
};

export default ContactsPage;

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
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
      initialData: { header, footer, vacancies },
      formData,
      categories,
      contacts,
    },
  };
};
