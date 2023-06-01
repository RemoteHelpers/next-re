import { FC } from "react";
import { Layout } from "@/components/Layout";
import {
	getAllVacancies,
	getCategories,
	getFooterData,
	getHeaderData,
	getCategoryBySlug,
	getVacancyListData,
	getFormData,
} from "@/services";
import { Category } from "@/components/Category";
import { ICategory } from "@/shared/types/CategoriesTypes";
import { IVacanciesInfo, IVacancy } from "@/shared/types/VacanciesTypes";
import { IFooterData } from "@/shared/types/FooterTypes";
import { IHeader } from "@/shared/types/HeaderTypes";
import { IFormData } from "@/shared/types/FormTypes";

interface CategoryPageProps {
	category: ICategory;
	categories: ICategory[];
	vacancies: IVacancy[];
	footerData: IFooterData;
	header: IHeader;
	vacanciesInfo: IVacanciesInfo;
	formData: IFormData;
}

const CategoryPage: FC<any> = ({
	category,
	categories,
	vacancies,
	footerData,
	header,
	vacanciesInfo,
	formData,
}) => {
	return (
		<Layout
			footerData={footerData}
			headerData={{ header, categories, vacancies }}>
			<Category
				category={category}
				header={header}
				vacanciesInfo={vacanciesInfo}
				formData={formData}
			/>
		</Layout>
	);
};

export default CategoryPage;

export const getServerSideProps = async (context: any) => {
	const params = context.params;
	const categorySlug = params?.category;
	const lang = context.locale;
	const categories = await getCategories(lang);
	const vacancies = await getAllVacancies(lang);
	const footerData = await getFooterData(lang);
	const category = await getCategoryBySlug(lang, categorySlug);
	const header = await getHeaderData(lang);
	const vacanciesInfo = await getVacancyListData(lang);
	const formData = await getFormData(lang);
	return {
		props: {
			category,
			categories,
			vacancies,
			footerData,
			header,
			vacanciesInfo,
			formData,
		},
	};
};
