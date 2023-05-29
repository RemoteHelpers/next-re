import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Thankyou } from "@/components/Thankyou";
import { getThankyouData } from "@/services/ThankyouService";
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
  thankyouData,
}: any) => {
  return (
    <Layout
      footerData={footerData}
      headerData={{ header, categories, vacancies }}
    >
      <Thankyou thankyouData={thankyouData} />
    </Layout>
  );
};

export default ContactsPage;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale;
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const header = await getHeaderData(lang);
  const thankyouData = await getThankyouData(lang);

  return {
    props: {
      categories,
      vacancies,
      footerData,
      header,
      thankyouData,
    },
  };
};
