import { FC, useContext } from "react";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import {
	getAllVacancies,
	getCategories,
	getFormData,
} from "@/services";
import { ICategory } from "@/shared/types/CategoriesTypes";
import { IVacancy } from "@/shared/types/VacanciesTypes";
import { IMenu } from "@/shared/types/HeaderTypes";
import { GetServerSidePropsContext } from "next";
import { getAboutData } from "@/services/AboutService";
import { IAbout } from "@/shared/types/AboutTypes";
import { AboutUs } from "@/components/AboutUs";
import MainForm from "@/components/MainForm/MainForm";
import type { IFormData } from "@/shared/types/FormTypes";
import { Specializations } from "@/components/Specializations";
import { GlobalContext } from "@/context";

type Props = {
	categories: ICategory[];
	vacancies: IVacancy[];
	about: IAbout;
	formData: IFormData;
};

const About: FC<Props> = ({
	categories,
	vacancies,
	about,
	formData,
}) => {
	const { header } = useContext(GlobalContext);
	const tabTitle = header?.menu?.find(
		({ path_id }: IMenu) => path_id === "about"
	)?.title!;

	return (
		<>
			<Head>
				<title>{tabTitle}</title>
				<meta name="description" content={about.WhatWeDoTitle} />
			</Head>

			<Layout headerData={{ categories, vacancies }}>
				<AboutUs about={about} tabTitle={tabTitle} />
				{/* <Specializations about={about} categories={categories} /> */}
				<MainForm formData={formData} />
			</Layout>
		</>
	);
};

export default About;

export const getServerSideProps = async ({
	locale,
}: GetServerSidePropsContext) => {
	const fetchCategories: Promise<ICategory[]> = getCategories(locale!);
	const fetchVacancies: Promise<IVacancy[]> = getAllVacancies(locale!);
	const fetchAbout: Promise<IAbout> = getAboutData(locale!);
	const fetchFormData = getFormData(locale!);

	const [categories, vacancies, about, formData] =
		await Promise.all([
			fetchCategories,
			fetchVacancies,
			fetchAbout,
			fetchFormData,
		]);

	return {
		props: {
			categories,
			vacancies,
			about,
			formData,
		},
	};
};
