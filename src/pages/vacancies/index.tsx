import { FC } from "react";
import { Layout } from "@/components/Layout";
import { VacanciesList } from "@/components/VacanciesList";
import { getVacancies } from "@/services";

const VacanciesPage: FC = ({ vacancies }: any) => {
  return (
    <Layout>
      <VacanciesList vacancies={vacancies} />
    </Layout>
  );
};

export default VacanciesPage;

export const getServerSideProps = async (context: any) => {
  const lang = context.locale === "ua" ? "uk" : context.locale;
  const vacancies = await getVacancies(lang);
  return {
    props: {
      vacancies,
    },
  };
};
