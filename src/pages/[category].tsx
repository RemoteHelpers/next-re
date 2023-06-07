import { FC } from "react";
import { Layout } from "@/components/Layout";
import {
	getAllVacancies,
	getCategories,
	getCategoryBySlug,
	getVacancyListData,
	getFormData,
} from "@/services";
import { Category } from "@/components/Category";
import { ICategory } from "@/shared/types/CategoriesTypes";
import { IVacanciesInfo, IVacancy } from "@/shared/types/VacanciesTypes";
import { IFormData } from "@/shared/types/FormTypes";

interface CategoryPageProps {
	category: ICategory;
	categories: ICategory[];
	vacancies: IVacancy[];
	vacanciesInfo: IVacanciesInfo;
	formData: IFormData;
}

const CategoryPage: FC<any> = ({
	category,
	categories,
	vacancies,
	vacanciesInfo,
	formData,
}) => {
	return (
		<Layout
			headerData={{ categories, vacancies }}>
			<Category
				category={category}
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
	const category = await getCategoryBySlug(lang, categorySlug);
	const vacanciesInfo = await getVacancyListData(lang);
	const formData = await getFormData(lang);
	return {
		props: {
			category,
			categories,
			vacancies,
			vacanciesInfo,
			formData,
		},
	};
};
