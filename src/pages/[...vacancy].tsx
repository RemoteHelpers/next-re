import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Vacancy } from "@/components/Vacancy";
import {
	getCategoryBySlug,
	getVacancy,
	getVacancyListData,
	getCategories,
} from "@/services";
import { VacancyNew } from "@/components/VacancyNew";
import { IVacancy, IVacanciesInfo } from "@/shared/types/VacanciesTypes";
import { ICategory } from "@/shared/types/CategoriesTypes";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface VacancyPageProps {
	categories: ICategory[];
	vacancy: IVacancy;
	vacanciesInfo: IVacanciesInfo;
	category: ICategory;
}

const VacancyPage: FC<VacancyPageProps> = ({
	categories,
	vacancy,
	vacanciesInfo,
	category,
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

			<Layout categories={categories}>
				{newVersion ? (
					<VacancyNew vacancy={vacancy} category={category} />
				) : (
					<Vacancy
						vacancy={vacancy}
						vacanciesInfo={vacanciesInfo}
						category={category}
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
	const [categorySlug, vacancySlug] = params?.vacancy!;
	/* queries for layout */
	const categories = await getCategories(locale!);
	/* queries for vacancy */
	const vacancy = await getVacancy(locale!, vacancySlug);
	const vacanciesInfo = await getVacancyListData(locale!);
	const category = await getCategoryBySlug(locale!, categorySlug);
  if (!locale || !categorySlug || !vacancySlug || !categories || !vacancy 
		|| !category || !vacanciesInfo) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			categories,
			vacancy,
			vacanciesInfo,
			category,
		},
	};
};
