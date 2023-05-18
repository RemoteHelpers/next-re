import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Category } from "@/components/Category";
import { getAllVacancies, getCategories, getFooterData, getHeaderData, getCategoryBySlug } from '@/services';

const VacancyPage: FC<any> = ({ category, categories, vacancies, footerData, header }: any) => {
  return (
    <Layout footerData={footerData} headerData={{ header, categories, vacancies }}>
      	<Category category={category} header={header} />
    </Layout>
  );
};

export default VacancyPage;
    
export const getServerSideProps = async (context: any) => {
  const params = context.params;
  const categorySlug = params?.category;
  const lang = context.locale === 'ua' ? 'uk' : context.locale;
const category = await getCategoryBySlug(categorySlug, lang);
  const categories = await getCategories(lang);
  const vacancies = await getAllVacancies(lang);
  const footerData = await getFooterData(lang);
  const header = await getHeaderData(lang);
  return {
    props: {
      category,
      categories,
      vacancies,
      footerData,
      header,
    },
  };
};
