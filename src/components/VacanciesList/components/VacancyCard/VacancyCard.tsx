import React, { useCallback } from "react";
import { IVacancy } from "@/shared/types";
import s from "./VacancyCard.module.scss";
import Link from "next/link";

type VacancyCardProps = {
	vacancy: IVacancy;
};

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
	const getPathToVacancy = useCallback(():string => {
		return `/${vacancy.attributes.categories.data[0].attributes.categorySlug}/${vacancy.attributes.vacancySlug}`;
	}, []);

	return (
		<Link href={getPathToVacancy()} className={s.vacancy}>
			<div className={s.info}>
				<h3 className={s.title}>{vacancy.attributes.title}</h3>
			</div>
			<div className={s.fake_button}>Побачити більше</div>
		</Link>
	);
};
