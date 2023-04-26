import { selectVacancies } from "@/redux/vacancies/vacanciesSelectors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { VacancyCard } from "./components/VacancyCard";
import { IVacancy } from "@/shared/types";
import s from "./VacanciesList.module.scss";
import { getVacancies } from "@/redux/vacancies/vacanciesOperations";
import { AppDispatch } from "@/redux/store";

type Props = {
	vacancies: IVacancy[];
};

export const VacanciesList = () => {
	const vacancies = useSelector(selectVacancies);
	return (
		<section className={s.vacancy_list}>
			{vacancies.map((vacancy: IVacancy) => (
				<VacancyCard key={vacancy.id} vacancy={vacancy} />
			))}
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
