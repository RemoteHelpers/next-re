import { FC, useEffect, useState } from "react";
import s from "./Vacancy.module.scss";
import { IVacancy } from "@/shared/types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "@/redux/language/langSelectors";
import { useRouter } from "next/router";
import { getVacancyBySlug } from "@/redux/vacancies/vacanciesOperations";
import { AppDispatch } from "@/redux/store";
import { selectVacancyBySlug } from "@/redux/vacancies/vacanciesSelectors";

export const Vacancy: FC = () => {
	const router = useRouter();
	const { vacancy: vacancyQuery } = router.query;

	const [vacancyCatSlug, setVacancyCatSlug] = useState<string>('');
	const [vacancySlug, setVacancySlug] = useState<string>('');
	const [vacancy, setVacancy] = useState<IVacancy>();

	const language = useSelector(selectLanguage);
	const dispatch = useDispatch<AppDispatch>();
	const vacancyData = useSelector(selectVacancyBySlug);

    useEffect(() => {
		if (vacancyQuery?.length === 2) {
			setVacancyCatSlug(prev => vacancyQuery[0]);
			setVacancySlug(prev => vacancyQuery[1]);
		}
	}, [vacancyQuery]);

    useEffect(() => {
		dispatch(getVacancyBySlug({
			lang: language.toLowerCase(),
			slug: vacancySlug
		}));
	}, [language, vacancySlug]);

	useEffect(() => {
		if (vacancyData) {
			setVacancy(vacancyData);			
		}
	}, [vacancyData])

	return (
		<div className={s.container}>
			<section className={s.vacancy}>
				<h1 className={s.title}>{vacancy?.attributes.title}</h1>
			</section>
		</div>
	);
};
