import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VacancyCard } from "./components/VacancyCard";
import { IVacancy } from "@/shared/types";
import s from "./VacanciesList.module.scss";
import { selectVacancies } from "@/redux/vacancies/vacanciesSelectors";
import { AppDispatch } from "@/redux/store";
import { selectLanguage } from "@/redux/language/langSelectors";
import { getVacancies } from "@/redux/vacancies/vacanciesOperations";

export const VacanciesList = () => {
	const vacanciesData = useSelector(selectVacancies);
	const dispatch = useDispatch<AppDispatch>();
	const lang = useSelector(selectLanguage);	
	
	const [vacancies, setVacancies] = useState<IVacancy[]>([]);
	
	useEffect(() => {
		dispatch(getVacancies({
			lang: lang.toLowerCase(),
		}));
	}, [lang]);

	useEffect(() => {
		setVacancies(vacanciesData);
	}, [vacanciesData]);

	return (
		<section className={s.vacancies_list}>
			<div className={s.container}>
				{vacancies.length > 0 &&
					vacancies.map((vacancy: IVacancy) => (
						<VacancyCard key={vacancy.id} vacancy={vacancy} />
					))}
			</div>
		</section>
	);
};

export async function getServerSideProps() {
	const dispatch = useDispatch<AppDispatch>();
	const lang = useSelector(selectLanguage);
	dispatch(getVacancies({lang}));	
}
