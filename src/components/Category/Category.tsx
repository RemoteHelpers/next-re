import React, { useMemo } from "react";
import s from "./Category.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { VacancyCard } from "../VacanciesList/components/VacancyCard";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { BreadcrumbsIcon } from "@/shared/components/IconComponents/BreadcrumbsIcon";

type CategoryProps = {
	category: any;
	header: any;
};

export const Category = ({ category, header }: CategoryProps) => {
	const { categoryTitle, categorySlug, description, vacancies } =
		category.attributes;
	const { menu, categoryButton } = header;
	const breadcrumbsItems = useMemo(
		(): ItemType[] => [
			{
				title: <Link href={"/"}>{menu[0].title}</Link>,
			},
			{
				title: categoryTitle,
			},
		],
		[header]
	);
	return (
		<section className={s.category}>
			<div className={s.container}>
				<div className={s.content}>
					<Breadcrumb
						items={breadcrumbsItems}
						separator={<BreadcrumbsIcon id="separator" />}
						className={s.breadcrumbs}					
					/>
					<h1 className={s.title}>{categoryTitle}</h1>
					<ReactMarkdown className={s.description}>{description}</ReactMarkdown>
					<button className={s.btn}>{categoryButton}</button>
					<div className={s.vacancies_list}>
						{vacancies.data.map(
							(vacancy: any) =>
								vacancy.attributes.isHot && (
									<VacancyCard
										vacancy={vacancy}
										category={categorySlug}
										header={header}
										key={vacancy.id}
									/>
								)
						)}
						{vacancies.data.map(
							(vacancy: any) =>
								!vacancy.attributes.isHot && (
									<VacancyCard
										vacancy={vacancy}
										category={categorySlug}
										key={vacancy.id}
									/>
								)
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
