import type { FC } from "react";
import { useMemo, useRef, useEffect } from "react";
import s from "./VacancyNew.module.scss";
import { Breadcrumbs } from "@/shared/components/Breadcrumbs";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Link from "next/link";
import { VacanciesIcon } from "@/shared/components/IconComponents/Vacancies";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import cat_hearts from "./assets/cat_hearts.png";
import cat_laptop from "./assets/cat_laptop.png";
import mainCat from "@/shared/images/Form/MainForm/main-cat.png";
import Image from "next/image";
import FormFields from "../FormFields/FormFields";
import { PhotoAPI } from "@/constants";
import useWebAnimations from "@wellyshen/use-web-animations";
import { useRouter } from "next/router";

const rotateKeyframes = [
	{
		transform: "rotate(0deg)",
	},
	{
		transform: "rotate(360deg)",
	},
];
const rotateOpts:
	| number
	| (KeyframeAnimationOptions & { pseudoElement?: string }) = {
	delay: 0,
	duration: 30000,
	iterations: 1,
	easing: "linear",
};

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
	if (!vacancy.attributes) {
		return <></>;
	}
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
	const router = useRouter();
	const formRef = useRef<any>(null);
	const circleRef = useRef<any>(null);
	const circleAnim = useWebAnimations<any>({
		ref: circleRef,
	});
	useEffect(() => {
		circleAnim.getAnimation()?.finish();
		circleAnim.animate({
			keyframes: rotateKeyframes,
			animationOptions: rotateOpts,
		});
	}, [router.locale]);
	useEffect(() => {
		if (circleAnim.playState === "finished") {
			circleAnim.animate({
				keyframes: rotateKeyframes,
				animationOptions: rotateOpts,
			});
		}
	}, [circleAnim, circleAnim.playState]);

	return (
		<section className={s.vacancy}>
			<div className={s.design_top}>
				<div className={s.light_blue}></div>
				<div className={s.blue}></div>
			</div>
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
						<div className={s.resp_img}>
							<Image src={cat_laptop} alt="resp_cat" />
							<svg
								ref={circleRef}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 90% 90%">
								<circle cx="50%" cy="50%" r="48%" />
								<circle cx="50%" cy="50%" r="48%" />
							</svg>
						</div>
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
			</div>
			<section className={s.join_us}>
				<div className={s.design_white}></div>
				<div className={s.container}>
					<ReactMarkdown className={s.join_desc}>
						{"##" + description.split("##").slice(-1)}
					</ReactMarkdown>
					<section className={s.form_wrapper} ref={formRef}>
						<FormFields formData={formData} />
						<Image className={s.form_cat} src={cat_hearts} alt={"form_cat"} />
					</section>
				</div>
			</section>
		</section>
	);
};