import { FC, useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";
import { Vacancy } from "@/components/Vacancy";

const VacancyPage: FC = () => {
	

	return (
		<Layout>	
			<Vacancy />
		</Layout>
	);
};

export default VacancyPage;
