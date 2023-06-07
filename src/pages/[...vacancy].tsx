import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Vacancy } from "@/components/Vacancy";
import {
	getCategoryBySlug,
	getFormData,
	getVacancy,
	getVacancyListData,
	getAllVacancies,
	getCategories,
} from "@/services";
import { VacancyNew } from "@/components/VacancyNew";
import { IVacancy, IVacanciesInfo } from "@/shared/types/VacanciesTypes";
import { ICategory } from "@/shared/types/CategoriesTypes";
import { IFormData } from "@/shared/types/FormTypes";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface VacancyPageProps {
	categories: ICategory[];
	vacancies: IVacancy[];
	vacancy: IVacancy;
	vacanciesInfo: IVacanciesInfo;
	category: ICategory;
	formData: IFormData;
}

const VacancyPage: FC<VacancyPageProps> = ({
	categories,
	vacancies,
	vacancy,
	vacanciesInfo,
	category,
	formData,
}: VacancyPageProps) => {
	const { newVersion, seoData, title, cardDescription } = vacancy.attributes;
	return (
		<>
			<Head>
				<title>
					{seoData ? seoData.seoTitle : `${title} - Remote Employees!`}
				</title>
				<meta
					name="description"
					content={seoData ? seoData.seoDescription : cardDescription}
				/>
			</Head>

			<Layout headerData={{ categories, vacancies }}>
				{newVersion ? (
					<VacancyNew
						vacancy={vacancy}
						category={category}
						formData={formData}
					/>
				) : (
					<Vacancy
						vacancy={vacancy}
						vacanciesInfo={vacanciesInfo}
						category={category}
						formData={formData}
					/>
				)}
			</Layout>
		</>
	);
};

export default VacancyPage;

export const getServerSideProps = async ({
	params,
	locale,
}: GetServerSidePropsContext) => {
	// const vacancySlug = params?.vacancy.at(-1);
	const [categorySlug, vacancySlug] = params?.vacancy!;
	/* queries for layout */
	const categories = await getCategories(locale!);
	const vacancies = await getAllVacancies(locale!);
	/* queries for vacancy */
	const vacancy = await getVacancy(locale!, vacancySlug);
	const vacanciesInfo = await getVacancyListData(locale!);
	const category = await getCategoryBySlug(locale!, categorySlug);
	const formData = await getFormData(locale!);
	return {
		props: {
			categories,
			vacancies,
			vacancy,
			vacanciesInfo,
			category,
			formData,
		},
	};
};
