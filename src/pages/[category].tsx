import { FC } from "react";
import { Layout } from "@/components/Layout";
import {
	getCategories,
	getCategoryBySlug,
	getVacancyListData,
} from "@/services";
import { Category } from "@/components/Category";
import { ICategory } from "@/shared/types/CategoriesTypes";
import { IVacanciesInfo } from "@/shared/types/VacanciesTypes";

interface CategoryPageProps {
	category: ICategory;
	categories: ICategory[];
	vacanciesInfo: IVacanciesInfo;
}

const CategoryPage: FC<CategoryPageProps> = ({
	category,
	categories,
	vacanciesInfo,
}: CategoryPageProps) => {
	return (
		<Layout categories={categories}>
			<Category category={category} vacanciesInfo={vacanciesInfo} />
		</Layout>
	);
};

export default CategoryPage;

export const getServerSideProps = async (context: any) => {
	const params = context.params;
	const categorySlug = params?.category;
	const lang = context.locale;
	const categories = await getCategories(lang);
	const category = await getCategoryBySlug(lang, categorySlug);
	const vacanciesInfo = await getVacancyListData(lang);
	return {
		props: {
			category,
			categories,
			vacanciesInfo,
		},
	};
};
