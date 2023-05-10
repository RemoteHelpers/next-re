import { FC } from "react";
import { Layout } from "@/components/Layout";
import { CurrentVacancies } from "@/components/CurrentVacancies";
import {
	getVacancyListData,
	getCategories,
	getAllVacancies,
	getHomeData,
} from "@/services";
import { Questions } from "@/components/Questions";
import Testimonials from "@/components/Testimonials/Testimonials";
import { Hero } from "@/components/Hero";
import { Spheres } from "@/components/Spheres";
import { Partners } from "@/components/Partners";

const Home: FC = ({ vacanciesInfo, categories, vacancies, homeData }: any) => {
	return (
		<>
			<Layout>
				<Hero data={homeData} />
        <Spheres title={homeData.spheresTitle} categories={categories} />
				<CurrentVacancies
					vacanciesInfo={vacanciesInfo}
					categories={categories}
					vacancies={vacancies}
				/>
				<Questions questions={homeData} />
				<Partners title={homeData.partnersTitle} slides={homeData.partnersSlider.data}/>
				<Testimonials testimonials={homeData} />
			</Layout>
		</>
	);
};

export default Home;

export const getServerSideProps = async (context: any) => {
	const lang = context.locale === "ua" ? "uk" : context.locale;
	const homeData = await getHomeData(lang);
	const vacanciesInfo = await getVacancyListData(lang);
	const categories = await getCategories(lang);
	const vacancies = await getAllVacancies(lang);

	return {
		props: {
			homeData,
			vacanciesInfo,
			categories,
			vacancies,
		},
	};
};
