import { FC } from "react";
import { Layout } from "@/components/Layout";
import { getCategoryBySlug, getHeaderData } from "@/services";
import { Category } from "@/components/Category";

const VacancyPage: FC = ({ category, header }: any) => {
	return (
		<Layout>
			<Category category={category} header={header} />
		</Layout>
	);
};

export default VacancyPage;

export const getServerSideProps = async (context: any) => {
	const params = context.params;
	const categorySlug = params?.category;
	const lang = context.locale === "ua" ? "uk" : context.locale;
	const category = await getCategoryBySlug(categorySlug, lang);
	const header = await getHeaderData(lang);
	return {
		props: {
			category,
			header,
		},
	};
};
