import { FC, useMemo, useRef } from "react";
import s from "./Vacancy.module.scss";
import { Breadcrumb } from "antd";
import { BreadcrumbsIcon } from "@/shared/components/IconComponents/BreadcrumbsIcon";
import Link from "next/link";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import FormFields from "../FormFields/FormFields";
import Image from "next/image";
import mainCat from "@/shared/images/Form/MainForm/main-cat.svg";
import { VacanciesIcon } from "@/shared/components/IconComponents/Vacancies";
import { VacancyItem } from "../Vacancies/components/VacanciesList/components/VacancyItem";

interface VacancyProps {
	vacancy: any;
	vacanciesInfo: any;
	category: any;
	formData: any;
	header: any;
}

export const Vacancy: FC<VacancyProps> = ({
	vacancy,
	vacanciesInfo,
	category,
	formData,
	header,
}: VacancyProps) => {
	const {
		cardDescription,
		createdAt,
		description,
		formTitle,
		isHot,
		subTitle,
		title,
		titleH1,
		vacancySlug,
		videoLink,
		videoPreview,
	} = vacancy.attributes;
	const { menu, isHotValue, seeMore } = header;
	const { categorySlug, categoryTitle, vacancies } = category.attributes;
	const breadcrumbsItems = useMemo(
		(): ItemType[] => [
			{
				title: <Link href={"/"}>{menu[0].title}</Link>,
			},
			{
				title: <Link href={`/${menu[1].path_id}`}>{menu[1].title}</Link>,
			},
			{
				title: <Link href={`/${categorySlug}`}>{categoryTitle}</Link>,
			},
			{
				title: title,
			},
		],
		[]
	);
	const formRef = useRef<any>(null);
	return (
		<section className={s.vacancy}>
			<div className={s.container}>
				<div className={s.content}>
					<div className={s.head}>
						<Breadcrumb
							items={breadcrumbsItems}
							separator={<BreadcrumbsIcon id="separator" />}
							className={s.breadcrumbs}
						/>
						{isHot && (
							<div className={s.hot_mark}>
								<VacanciesIcon name="fire" />
								<span className={s.hot_mark_text}>{isHotValue}</span>
							</div>
						)}
					</div>
					<div className={s.short}>
						<div className={s.short_info}>
							<h1 className={s.title}>{titleH1}</h1>
							<h3 className={s.subtitle}>{subTitle}</h3>
							<p className={s.short_desc}>{cardDescription}</p>
						</div>
						<div className={s.short_video}></div>
					</div>
					<ReactMarkdown className={s.description}>{description}</ReactMarkdown>
					<div className={s.form_wrapper} ref={formRef}>
						<FormFields formData={formData} />
						<Image className={s.main_cat} src={mainCat} alt={"main cat"} />
					</div>
				</div>
				<div className={s.vacancies_list}>
					{vacancies.data.map((vacancy: any, index: number) => {
						const { vacancySlug: slug } = vacancy.attributes;
						const condition = slug !== vacancySlug && index < 3;
						if (condition) {
							return (
								<VacancyItem
									key={vacancy.id}
									attributes={vacancy.attributes}
									vacanciesInfo={vacanciesInfo}
									category={categorySlug}
								/>
							);
						}
					})}
        </div>
        <button className={s.see_more}>{seeMore}</button>
			</div>
		</section>
	);
};
