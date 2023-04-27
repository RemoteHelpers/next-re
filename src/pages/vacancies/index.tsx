import { FC } from "react";
import { Layout } from "@/components/Layout";
import { VacanciesList } from "@/components/VacanciesList";

const VacanciesPage: FC = () => {
	return (
		<Layout>
			<VacanciesList />
		</Layout>
	);
};

export default VacanciesPage;
