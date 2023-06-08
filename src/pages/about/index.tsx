import { FC, useContext, useRef } from "react";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import { getAllVacancies, getCategories } from "@/services";
import { ICategory } from "@/shared/types/CategoriesTypes";
import { IVacancy } from "@/shared/types/VacanciesTypes";
import { IMenu } from "@/shared/types/HeaderTypes";
import { GetServerSidePropsContext } from "next";
import { getAboutData } from "@/services/AboutService";
import { IAbout } from "@/shared/types/AboutTypes";
import { AboutUs } from "@/components/AboutUs";
import MainForm from "@/components/MainForm/MainForm";
import { Specializations } from "@/components/Specializations";
import { GlobalContext } from "@/context";

type Props = {
	categories: ICategory[];
	about: IAbout;
};

const About: FC<Props> = ({ categories, about }) => {
	const { header } = useContext(GlobalContext);
	const tabTitle = header?.menu?.find(
		({ path_id }: IMenu) => path_id === "about"
	)?.title!;
    const pageTitle = header.menu.find(({ path_id }: IMenu) => path_id === 'about')?.title!;
const formRef = useRef<HTMLElement>(null);
    
	return (
		<>
			<Head>
				<title>{tabTitle}</title>
				<meta name="description" content={about.WhatWeDoTitle} />
			</Head>

			<Layout categories={categories}>
				<AboutUs about={about} pageTitle={pageTitle} formRef={formRef} />
			<Specializations about={about} categories={categories} />
				<MainForm
          imageCatProps={header?.mainCat.data.attributes.url}
          formRef={formRef}
        />
			</Layout>
		</>
	);

};

export default About;

export const getServerSideProps = async ({
	locale,
}: GetServerSidePropsContext) => {
	const fetchCategories: Promise<ICategory[]> = getCategories(locale!);
	const fetchAbout: Promise<IAbout> = getAboutData(locale!);
	const [categories, about] = await Promise.all([fetchCategories, fetchAbout]);
	return {
		props: {
			categories,
			about,
		},
	};
};
