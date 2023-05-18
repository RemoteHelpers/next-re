import { FC } from "react";
import { Layout } from "@/components/Layout";

const VacancyPage: FC = ({category}: any) => {
	return (
		<Layout>
			<h1>{category}</h1>
		</Layout>
	);
};

export default VacancyPage;
    
export const getServerSideProps = async (context: any) => {
	const params = context.params;
	const categorySlug = params?.category;

	return {
		props: {
			category: categorySlug,
		},
	};
};
