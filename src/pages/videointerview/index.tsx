import { FC } from "react";
import { Layout } from "@/components/Layout";
import { getAllVacancies, getCategories } from "@/services";
import { VideointerviewPage } from "@/components/VideoInterview";
import { getVideointerviewData } from "@/services";

const Videointerview: FC<any> = ({ categories, videoData }) => {
	return (
		<Layout categories={categories}>
			<VideointerviewPage videoData={videoData} />
		</Layout>
	);
};

export default Videointerview;

export const getServerSideProps = async (context: any) => {
	const lang = context.locale;
	const categories = await getCategories(lang);
	const videoData = await getVideointerviewData(lang);
	return {
		props: {
			categories,
			videoData,
		},
	};
};
