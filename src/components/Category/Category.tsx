import React from "react";
import s from "./Category.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { VacancyCard } from "../VacanciesList/components/VacancyCard";

type CategoryProps = {
	category: any;
	header: any;
};

export const Category = ({ category, header }: CategoryProps) => {
	const { categoryTitle, categorySlug, description, vacancies } = category.attributes;
	console.log(vacancies);
	return (
		<section className={s.category}>
			<div className={s.container}>
				<div className={s.content}>
					<h1 className={s.title}>{categoryTitle}</h1>
					<ReactMarkdown className={s.description}>{description}</ReactMarkdown>
					<button className={s.btn}>{header?.categoryButton}</button>
					<div className={s.vacancies_list}>
						{vacancies.data.map((vacancy: any) => (
							<VacancyCard vacancy={vacancy} category={categorySlug} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
