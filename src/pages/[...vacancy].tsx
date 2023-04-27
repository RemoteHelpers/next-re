import { FC, useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";
import { Vacancy } from "@/components/Vacancy";

const VacancyPage: FC = () => {
	const router = useRouter();
	const { vacancy } = router.query;

	// const [vacancyQuery, setVacancyQuery] = useState<string | string[] | undefined>([]);

	// useEffect(() => {
	// 	setVacancyQuery(prev => vacancy);
	// }, [vacancy])

	return (
		<Layout>	
			<Vacancy vacancyQuery={vacancy} />
		</Layout>
	);
};

export default VacancyPage;
