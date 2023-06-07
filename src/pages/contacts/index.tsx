import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Contacts } from "@/components/Contacts";
import { getContactData, getFormData } from '@/services';
import {
  getAllVacancies,
  getCategories,
} from "@/services";

const ContactsPage: FC = ({
  categories,
  vacancies,
  contacts,
  formData
}: any) => {
  return (
    <Layout
      headerData={{  categories, vacancies }}
    >
      <Contacts contactsData={contacts} formData={formData} />
    </Layout>
  );
};

export default ContactsPage;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale === "ua" ? "uk" : context.locale;
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const contacts = await getContactData(lang);
  const formData = await getFormData(lang);

  return {
    props: {
      categories,
      vacancies,
      contacts,
      formData
    },
  };
};
