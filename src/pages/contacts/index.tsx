import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Contacts } from "@/components/Contacts";
import { getContactData, getFormData } from '@/services';
import {
  getAllVacancies,
  getCategories,
  getFooterData,
  getHeaderData,
} from "@/services";

const ContactsPage: FC = ({
  footerData,
  header,
  categories,
  vacancies,
  contacts,
  formData
}: any) => {
  return (
    <Layout
      footerData={footerData}
      headerData={{ header, categories, vacancies }}
    >
      <Contacts contactsData={contacts} formData={formData} header={header} />
    </Layout>
  );
};

export default ContactsPage;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale === "ua" ? "uk" : context.locale;
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const header = await getHeaderData(lang);
  const contacts = await getContactData(lang);
  const formData = await getFormData(lang);

  return {
    props: {
      categories,
      vacancies,
      footerData,
      header,
      contacts,
      formData
    },
  };
};
