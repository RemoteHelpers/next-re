import { FC, useMemo, useRef } from "react";
import s from "./Vacancy.module.scss";
import Link from "next/link";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import FormFields from "../FormFields/FormFields";
import Image from "next/image";
import mainCat from "@/shared/images/Form/MainForm/main-cat.png";
import laptopCat from "./assets/laptop_cat.svg";
import { VacanciesIcon } from "@/shared/components/IconComponents/Vacancies";
import { VacancyItem } from "../Vacancies/components/VacanciesList/components/VacancyItem";
import { Breadcrumbs } from "@/shared/components/Breadcrumbs";
import dynamic from "next/dynamic";
import { IVacancy, IVacanciesInfo } from "@/shared/types/VacanciesTypes";
import { ICategory } from "@/shared/types/CategoriesTypes";
import { IFormData } from "@/shared/types/FormTypes";
import { IHeader } from "@/shared/types/HeaderTypes";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface VacancyProps {
	vacancy: IVacancy;
	vacanciesInfo: IVacanciesInfo;
	category: ICategory;
	formData: IFormData;
	header: IHeader;
}

export const Vacancy: FC<VacancyProps> = ({
	vacancy,
	vacanciesInfo,
	category,
	formData,
	header,
}: VacancyProps) => {
	if (!vacancy.attributes) {
		return <></>;
	}
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
	const { respondBtn } = formData;
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
		[menu, categorySlug, categoryTitle]
	);
	const formRef = useRef<HTMLDivElement>(null);
	return (
		<section className={s.vacancy}>
			<div className={s.container}>
				<div className={s.content}>
					<div className={s.head}>
						<Breadcrumbs items={breadcrumbsItems} />
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
							<ReactMarkdown className={s.short_desc}>
								{cardDescription}
							</ReactMarkdown>
							<button
								type="button"
								className={s.short_btn}
								onClick={() =>
									formRef?.current?.scrollIntoView({
										block: "center",
										behavior: "smooth",
									})
								}>
								{respondBtn}
							</button>
						</div>
						{videoLink ? (
							<div className={s.short_video}>
								<ReactPlayer
									className={s.video_iframe}
									url={videoLink}
									controls
								/>
							</div>
						) : (
							<div className={s.cat_placeholder}>
								<Image src={laptopCat} alt="laptop_cat" />
							</div>
						)}
					</div>
					<ReactMarkdown className={s.description}>{description}</ReactMarkdown>
					<div className={s.form_wrapper} ref={formRef}>
						<FormFields formData={formData} />
						<Image className={s.main_cat} src={mainCat} alt={"main cat"} />
					</div>
				</div>
				<div className={s.vacancies_list}>
					{vacancies && vacancies.data.map((vacancy: IVacancy, index: number) => {
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
				<Link href={`/${menu[1].path_id}`} className={s.see_more}>
					{seeMore}
				</Link>
			</div>
		</section>
	);
};
