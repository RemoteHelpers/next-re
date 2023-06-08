import { FC, useEffect, useRef } from "react";
import type { GetServerSidePropsContext } from "next";
import { Layout } from "@/components/Layout";
import { Vacancies } from "@/components/Vacancies";
import { Questions } from "@/components/Questions";
import Testimonials from "@/components/Testimonials/Testimonials";
import { Hero } from "@/components/Hero";
import { getVacancyListData, getCategories, getHomeData } from "@/services";
import { Spheres } from "@/components/Spheres";
import { Partners } from "@/components/Partners";
import MainForm from "@/components/MainForm/MainForm";
import type { IVacanciesInfo } from "@/shared/types/VacanciesTypes";
import type { ICategory } from "@/shared/types/CategoriesTypes";
import type { IHomeData } from "@/shared/types/HomeTypes";

type Props = {
	vacanciesInfo: IVacanciesInfo;
	categories: ICategory[];
	homeData: IHomeData;
};

const Home: FC<Props> = ({ vacanciesInfo, categories, homeData }) => {
	const formRef = useRef<HTMLElement>(null);
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<>
			<Layout categories={categories}>
				<Hero data={homeData} formRef={formRef} />
				<Spheres title={homeData.spheresTitle} categories={categories} />
				<Vacancies vacanciesInfo={vacanciesInfo} categories={categories} />
				<Questions questions={homeData} />
				<Partners
					title={homeData.partnersTitle}
					slides={homeData.partnersSlider.data}
				/>
				<Testimonials testimonials={homeData} />
				<MainForm formRef={formRef} />
			</Layout>
		</>
	);
};

export default Home;

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const lang = context.locale!;
	const vacanciesInfo = await getVacancyListData(lang);
	const categories = await getCategories(lang, "categorySlug,categoryTitle");
	const homeData = await getHomeData(
		lang,
		"Testimonials.personImg,Faq_Question,partnersSlider,heroStats.heroStatIcon"
	);

	return {
		props: {
			vacanciesInfo,
			categories,
			homeData,
		},
	};
};
