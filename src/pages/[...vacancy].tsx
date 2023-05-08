import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Vacancy } from "@/components/Vacancy";
import { getVacancy } from "@/services";

const VacancyPage: FC = ({ vacancy }: any) => {
  return (
    <Layout>
      <Vacancy vacancy={vacancy} />
    </Layout>
  );
};

export default VacancyPage;

export const getServerSideProps = async (context: any) => {
  const params = context.params;
  const slug = params?.vacancy?.slice(1)[0];

  const lang = context.locale === "ua" ? "uk" : context.locale;
  const vacancy = await getVacancy(lang, slug);
  return {
    props: {
      vacancy,
    },
  };
};
