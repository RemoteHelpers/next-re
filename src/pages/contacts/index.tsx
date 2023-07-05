import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
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
import type {
  IMainData,
  ICategory,
  IContacts,
  IFormData,
  INavUrlState,
  IInitialData,
  LocalesLiteral,
} from '@/shared/types';
import getPageTitle from '@/shared/functions/pageTitleGetter';
import { titleCompanyInfo } from '@/constants';
import { appMetadata } from '@/api/metadata';

type Props = {
  categories: ICategory[];
  contacts: IContacts;
  initialData: IInitialData;
  formData: IFormData;
  navUrlState: INavUrlState;
};
const ContactsPage: FC<Props> = ({ categories, contacts, initialData, formData, navUrlState }) => {
  const { header } = initialData;
  const metaTitle = useCallback(() => getPageTitle(header, 'contacts'), [header]);
  const appMeta = appMetadata[useRouter().locale as LocalesLiteral];

  return (
    <>
      <Head>
        <title>{metaTitle() + titleCompanyInfo}</title>
        <meta property="og:title" content={metaTitle()} />

        <meta name="description" content={appMeta.description} />
        <meta property="og:description" content={appMeta.og.description} />
      </Head>

      <Layout categories={categories} data={{ ...initialData, ...navUrlState }}>
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
      initialData: {
        header,
        footer,
        vacancies,
      },
      formData,
      categories,
      contacts,
    },
  };
};
