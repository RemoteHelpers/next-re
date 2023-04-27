import { FC, useEffect, useState } from "react";
import s from "./Vacancy.module.scss";
import { IVacancy } from "@/shared/types";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/language/langSelectors";

interface VacancyProps {
	vacancyQuery: string | string[] | undefined;
}

export const Vacancy: FC<VacancyProps> = ({ vacancyQuery }: VacancyProps) => {
	const [vacancyCatSlug, setVacancyCatSlug] = useState<string>();
	const [vacancySlug, setVacancySlug] = useState<string>();
	const [vacancy, setVacancy] = useState<IVacancy | null>(null);

	const language = useSelector(selectLanguage);

    useEffect(() => {
        console.log(vacancyQuery);
		if (vacancyQuery?.length === 2) {
			setVacancyCatSlug(prev => vacancyQuery.at(0));
			setVacancySlug(prev => vacancyQuery.at(1));
		}
	}, [vacancyQuery]);

    useEffect(() => {
		axios
        .get("https://strapi.rem-s.com/api/vacancies", {
            params: {
                populate: "*",
                locale: language.toLowerCase(),
                "filters[vacancySlug][$eq]": vacancySlug,
            },
        })
        .then((response) => {
                // console.log(language, vacancySlug, response.data.data, Date.now());
				setVacancy(response.data.data);
			});
	}, [language, vacancySlug]);

	return (
		<div className={s.container}>
			<section className={s.vacancy}>
				<h1 className={s.title}>{vacancySlug}</h1>
			</section>
		</div>
	);
};
