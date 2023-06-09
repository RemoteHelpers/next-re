import React, { useMemo, useRef } from "react";
import s from "./Category.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { VacancyCard } from "../VacanciesList/components/VacancyCard";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { BreadcrumbsIcon } from "@/shared/components/IconComponents/BreadcrumbsIcon";
import { VacancyItem } from "../Vacancies/components/VacanciesList/components/VacancyItem";
import FormFields from "../FormFields/FormFields";
import mainCat from "@/shared/images/Form/MainForm/main-cat.svg";
import Image from "next/image";

type CategoryProps = {
	category: any;
	header: any;
	vacanciesInfo: any;
	formData: any;
};

export const Category = ({
	category,
	header,
	vacanciesInfo,
	formData,
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
	const formRef = useRef<any>(null);
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
					<button
						className={s.btn}
						onClick={() => {
							formRef?.current?.scrollIntoView({
								block: "center",
								behavior: "smooth",
							});
						}}>
						{categoryButton}
					</button>
					<div className={s.vacancies_list}>
						{vacancies.data.map(
							(vacancy: any) =>
								vacancy.attributes.isHot && (
									<VacancyItem
										key={vacancy.id}
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
										key={vacancy.id}
										attributes={vacancy.attributes}
										vacanciesInfo={vacanciesInfo}
										category={categorySlug}
									/>
								)
						)}
					</div>
					<div className={s.form_wrapper} ref={formRef}>
						<FormFields formData={formData} />
						<Image className={s.main_cat} src={mainCat} alt={"main cat"} />
					</div>
				</div>
			</div>
		</section>
	);
};
