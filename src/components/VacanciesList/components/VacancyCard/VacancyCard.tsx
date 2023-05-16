import React, { useCallback } from "react";
import { IVacancy } from "@/shared/types";
import s from "./VacancyCard.module.scss";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { CurrentVacanciesIcon } from "@/shared/components/IconComponents/CurrentVacanciesIcon";

type VacancyCardProps = {
	vacancy: IVacancy;
	category?: string;
};

export const VacancyCard = ({ vacancy, category }: VacancyCardProps) => {
	const getPathToVacancy = useCallback((): string => {
		if (category) {
			return `/${category}/${vacancy.attributes.vacancySlug}`;
		} else {
			return `/${vacancy.attributes.categories.data[0].attributes.categorySlug}/${vacancy.attributes.vacancySlug}`;
		}
	}, []);
	console.log(vacancy);

	return (
		<Link href={getPathToVacancy()} className={s.vacancy}>
			<div className={s.info}>
				{vacancy.attributes.isHot && <div className={s.hot_mark}>
				<CurrentVacanciesIcon name="fire" />
                        <span className={s.labelText}>Гаряча</span></div>}
				<h3 className={s.title}>{vacancy.attributes.title}</h3>
				<h4 className={s.subtitle}>{vacancy.attributes.subTitle}</h4>
				<p className={s.desc}>{vacancy.attributes.cardDescription}</p>
			</div>
			<div className={s.fake_button}>Побачити більше</div>
		</Link>
	);
};
