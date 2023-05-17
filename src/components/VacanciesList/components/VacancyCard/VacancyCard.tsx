import React, { useCallback } from "react";
import { IVacancy } from "@/shared/types";
import s from "./VacancyCard.module.scss";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { VacanciesIcon } from "@/shared/components/IconComponents/VacanciesIcon";

type VacancyCardProps = {
	vacancy: IVacancy;
	category?: string;
	header?: any;
};

export const VacancyCard = ({
	vacancy,
	category,
	header,
}: VacancyCardProps) => {
	const getPathToVacancy = useCallback((): string => {
		if (category) {
			return `/${category}/${vacancy.attributes.vacancySlug}`;
		} else {
			return `/${vacancy.attributes.categories.data[0].attributes.categorySlug}/${vacancy.attributes.vacancySlug}`;
		}
	}, []);

	return (
		<article className={s.vacancy}>
			<div className={s.info}>
				{vacancy.attributes.isHot && (
					<div className={s.hot_mark}>
						<VacanciesIcon name="fire" />
						<span className={s.labelText}>{header.isHotValue}</span>
					</div>
				)}
				<h3 className={s.title}>{vacancy.attributes.title}</h3>
				<h4 className={s.subtitle}>{vacancy.attributes.subTitle}</h4>
				<ReactMarkdown className={s.desc}>{vacancy.attributes.cardDescription}</ReactMarkdown>
			</div>
			<Link href={getPathToVacancy()} className={s.link}>Побачити більше</Link>
		</article>
	);
};
