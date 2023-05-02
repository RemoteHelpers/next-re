import { FC, useEffect, useState } from "react";
import s from "./Vacancy.module.scss";
import { IVacancy } from "@/shared/types";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "@/redux/language/langSelectors";
import { useRouter } from "next/router";
import { getVacancyBySlug } from "@/redux/vacancies/vacanciesOperations";
import { AppDispatch } from "@/redux/store";
import { selectVacancyBySlug } from "@/redux/vacancies/vacanciesSelectors";

interface VacancyProps {
	vacancy: any;
}

export const Vacancy: FC<VacancyProps> = ({ vacancy }: VacancyProps) => {
	return (
		<div className={s.container}>
			<section className={s.vacancy}>
				<h1 className={s.title}>{vacancy?.attributes.title}</h1>
			</section>
		</div>
	);
};
