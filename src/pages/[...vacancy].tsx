import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Vacancy } from "@/components/Vacancy";
import {
	getCategoryBySlug,
	getFormData,
	getVacancy,
	getVacancyListData,
} from "@/services";
import {
	getAllVacancies,
	getCategories,
	getFooterData,
	getHeaderData,
} from "@/services";
import { VacancyNew } from "@/components/VacancyNew";
import { IVacancy, IVacanciesInfo } from "@/shared/types/VacanciesTypes";
import { ICategory } from "@/shared/types/CategoriesTypes";
import { IFooterData } from "@/shared/types/FooterTypes";
import { IHeader } from "@/shared/types/HeaderTypes";
import { IFormData } from "@/shared/types/FormTypes";

interface VacancyPageProps {
	categories: ICategory[];
	vacancies: IVacancy[];
	footerData: IFooterData;
	header: IHeader;
	vacancy: IVacancy;
	vacanciesInfo: IVacanciesInfo;
	category: ICategory;
	formData: IFormData;
}

const VacancyPage: FC<VacancyPageProps> = ({
	categories,
	vacancies,
	footerData,
	header,
	vacancy,
	vacanciesInfo,
	category,
	formData,
}: VacancyPageProps) => {
	const { newVersion } = vacancy.attributes;
	return (
		<Layout
			footerData={footerData}
			headerData={{ header, categories, vacancies }}>
			{newVersion ? (
				<VacancyNew
					vacancy={vacancy}
					category={category}
					formData={formData}
					header={header}
				/>
			) : (
				<Vacancy
					vacancy={vacancy}
					vacanciesInfo={vacanciesInfo}
					category={category}
					formData={formData}
					header={header}
				/>
			)}
		</Layout>
	);
};

export default VacancyPage;

export const getServerSideProps = async (context: any) => {
	const params = context.params;
	// const vacancySlug = params?.vacancy.at(-1);
	const [categorySlug, vacancySlug] = params?.vacancy;
	const lang = context.locale;
	/* queries for layout */
	const categories = await getCategories(lang);
	const vacancies = await getAllVacancies(lang);
	const footerData = await getFooterData(lang);
	const header = await getHeaderData(lang);
	/* queries for vacancy */
	const vacancy = await getVacancy(lang, vacancySlug);
	const vacanciesInfo = await getVacancyListData(lang);
	const category = await getCategoryBySlug(lang, categorySlug);
	const formData = await getFormData(lang);
	return {
		props: {
			categories,
			vacancies,
			footerData,
			header,
			vacancy,
			vacanciesInfo,
			category,
			formData,
		},
	};
};
