import { FC, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Vacancies } from "@/components/Vacancies";
import { Questions } from "@/components/Questions";
import Testimonials from "@/components/Testimonials/Testimonials";
import { Hero } from "@/components/Hero";
import {
	getVacancyListData,
	getCategories,
	getAllVacancies,
	getHomeData,
	getFooterData,
	getFormData,
	getHeaderData,
} from "@/services";
import { Spheres } from "@/components/Spheres";
import { Partners } from "@/components/Partners";
import MainForm from "@/components/MainForm/MainForm";

const Home: FC = ({
	vacanciesInfo,
	categories,
	vacancies,
	homeData,
	footerData,
	header,
	formData,
}: any) => {
	const formRef = useRef(null);
	return (
		<>
			<Layout
				footerData={footerData}
				headerData={{ header, categories, vacancies }}>
				<Hero data={homeData} formRef={formRef} />
				<Spheres title={homeData.spheresTitle} categories={categories} />
				<Vacancies
					vacanciesInfo={vacanciesInfo}
					categories={categories}
					vacancies={vacancies}
				/>
				<Questions questions={homeData} />
				<Partners
					title={homeData.partnersTitle}
					slides={homeData.partnersSlider.data}
				/>
				<Testimonials testimonials={homeData} />
				<MainForm formData={formData} formRef={formRef} />
			</Layout>
		</>
	);
};

export default Home;

export const getServerSideProps = async (context: any) => {
	const lang = context.locale;
	const vacanciesInfo = await getVacancyListData(lang);
	const categories = await getCategories(lang);
	const vacancies = await getAllVacancies(lang);
	const homeData = await getHomeData(lang);
	const footerData = await getFooterData(lang);
	const formData = await getFormData(lang);
	const header = await getHeaderData(lang);

	return {
		props: {
			vacanciesInfo,
			categories,
			vacancies,
			homeData,
			footerData,
			formData,
			header,
		},
	};
};
