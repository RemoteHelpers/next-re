import type { FC } from "react";
import { useMemo, useRef } from "react";
import s from "./VacancyNew.module.scss";
import { Breadcrumbs } from "@/shared/components/Breadcrumbs";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Link from "next/link";
import { VacanciesIcon } from "@/shared/components/IconComponents/Vacancies";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import cat_hearts from "./assets/cat_hearts.png";
import cat_laptop from "./assets/cat_laptop.png";
import mainCat from "@/shared/images/Form/MainForm/main-cat.svg";
import Image from "next/image";
import FormFields from "../FormFields/FormFields";
import { PhotoAPI } from "@/constants";

interface VacancyNewProps {
	vacancy: any;
	vacanciesInfo: any;
	category: any;
	formData: any;
	header: any;
}

export const VacancyNew: FC<VacancyNewProps> = ({
	vacancy,
	vacanciesInfo,
	category,
	formData,
	header,
}) => {
	const {
		cardDescription,
		description,
		isHot,
		subTitle,
		title,
		titleH1,
		vacancySlug,
		productsTitle,
		products,
		responsibilityTitle,
		responsibilities,
		toolsTitle,
		tools,
	} = vacancy.attributes;
	console.log(["##"].concat(description.split("##")).at(-1));
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
	const formRef = useRef<any>(null);

	return (
		<section className={s.vacancy}>
			<div className={s.container}>
				<section className={s.head}>
					<Breadcrumbs items={breadcrumbsItems} />
					{isHot && (
						<div className={s.hot_mark}>
							<VacanciesIcon name="fire" />
							<span className={s.hot_mark_text}>{isHotValue}</span>
						</div>
					)}
				</section>
				<section className={s.short}>
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
					<div className={s.cat}>
						<Image src={cat_hearts} alt="cat_hearts" />
					</div>
				</section>
				<section className={s.products}>
					<h2 className={s.ps_title}>{productsTitle}</h2>
					<div className={s.products_items}>
						{products.map((p: any) => {
							const {
								height,
								width,
								url,
								alternativeText: alt,
							} = p.productImg.data.attributes;
							return (
								<div className={s.product} key={p.id}>
									<Image
										src={PhotoAPI + url}
										className={s.p_icon}
										alt={alt}
										width={width}
										height={height}
									/>
									<h4 className={s.p_title}>{p.productTitle}</h4>
									<p className={s.p_text}>{p.productText}</p>
								</div>
							);
						})}
					</div>
				</section>
				<section className={s.responsibilities}>
					<h2 className={s.resp_title}>{responsibilityTitle}</h2>
					<div className={s.resp_content}>
						<Image src={cat_laptop} alt="resp_cat" className={s.resp_img} />
						<ul className={s.resp_list}>
							{responsibilities.map(({ responsibilityLi, id }: any) => {
								return (
									<li className={s.resp_item} key={id}>
										<span className={s.resp_item_bullet}></span>
										<p className={s.resp_item_text}>{responsibilityLi}</p>
									</li>
								);
							})}
						</ul>
					</div>
				</section>
				<section className={s.tools}>
					<h2 className={s.tools_title}>{toolsTitle}</h2>
					<div className={s.tools_items}>
						{tools.map((tool: any) => {
							const { toolImg, toolText } = tool;
							const {
								height,
								width,
								url,
								alternativeText: alt,
							} = toolImg.data.attributes;
							return (
								<div className={s.tool_item} key={tool.id}>
									<Image
										src={PhotoAPI + url}
										className={s.tool_icon}
										alt={alt}
										width={width}
										height={height}
									/>
									<h5 className={s.tool_title}>{toolText}</h5>
								</div>
							);
						})}
					</div>
				</section>
				<section className={s.join_us}>
					<ReactMarkdown className={s.join_desc}>
						{"##" + description.split("##").slice(-1)}
					</ReactMarkdown>
					<section className={s.form_wrapper} ref={formRef}>
						<FormFields formData={formData} />
						<Image className={s.form_cat} src={cat_hearts} alt={"form_cat"} />
					</section>
				</section>
			</div>
		</section>
	);
};
