import React, { useMemo } from "react";
import s from "./Category.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { VacancyCard } from "../VacanciesList/components/VacancyCard";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { BreadcrumbsIcon } from "@/shared/components/IconComponents/BreadcrumbsIcon";
import { VacancyItem } from "../Vacancies/components/VacanciesList/components/VacancyItem";

type CategoryProps = {
	category: any;
	header: any;
	vacanciesInfo: any;
};

export const Category = ({
	category,
	header,
	vacanciesInfo,
}: CategoryProps) => {
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
	console.log(vacancies);
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
									<VacancyItem
										attributes={vacancy.attributes}
										vacanciesInfo={vacanciesInfo}
										category={categorySlug}
									/>
								)
						)}
						{vacancies.data.map(
							(vacancy: any) =>
								!vacancy.attributes.isHot && (
									<VacancyItem
										attributes={vacancy.attributes}
										vacanciesInfo={vacanciesInfo}
										category={categorySlug}
									/>
								)
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
