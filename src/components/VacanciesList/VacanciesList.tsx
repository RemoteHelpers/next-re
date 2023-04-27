import { selectVacancies } from "@/redux/vacancies/vacanciesSelectors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VacancyCard } from "./components/VacancyCard";
import { IVacancy } from "@/shared/types";
import s from "./VacanciesList.module.scss";
import { getVacancies } from "@/redux/vacancies/vacanciesOperations";
import { AppDispatch } from "@/redux/store";

export const VacanciesList = () => {
	const vacanciesData = useSelector(selectVacancies);
	const [vacancies, setVacancies] = useState<IVacancy[]>([]);

	useEffect(() => {
		setVacancies(vacanciesData);
	}, [vacanciesData]);

	return (
		<section className={s.vacancies_list}>
			<div className={s.container}>
				{vacancies.map((vacancy: IVacancy) => (
					<VacancyCard key={vacancy.id} vacancy={vacancy} />
				))}
			</div>
		</section>
	);
};

// export async function getStaticProps() {
// 	const dispatch = useDispatch<AppDispatch>();
// 	const response = await dispatch(getVacancies('uk'));
// 	const vacancies = useSelector(selectVacancies);
// 	console.log(response);
// 	return {
// 		props: {
// 			vacancies
// 		},
// 	};
// }
