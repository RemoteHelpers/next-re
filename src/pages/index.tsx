import { FC } from "react";
import { Layout } from "@/components/Layout";
import { Questions } from "@/components/Questions";
import { getHomeData } from "@/services";
import { Hero } from "@/components/Hero";

const Home: FC = ({ homeData }: any) => {
	return (
		<>
			<Layout>
        <Hero data={homeData} />
				<Questions questions={homeData} />
			</Layout>
		</>
	);
};

export default Home;

export const getServerSideProps = async (context: any) => {
	const lang = context.locale === "ua" ? "uk" : context.locale;
	const homeData = await getHomeData(lang);

	return {
		props: {
			homeData,
		},
	};
};
