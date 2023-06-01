import type { FC } from "react";
import Image from "next/image";
import { IVacancyPageData } from "@/shared/types/VacanciesTypes";
import { PhotoAPI } from "@/constants";
import s from "./VacanciesHero.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface VacanciesHeroProps {
	vacancyPageData: IVacancyPageData;
}

export const VacanciesHero: FC<VacanciesHeroProps> = ({
	vacancyPageData,
}: VacanciesHeroProps) => {
	const { title, description, firstImage } = vacancyPageData;
	const {
		url,
		width,
		height,
		alternativeText: alt,
	} = firstImage.data.attributes;
	return (
		<section className={s.hero}>
			<div className={s.container}>
				<div className={s.info}>
					<h1 className={s.title}>{title}</h1>
					<ReactMarkdown className={s.desc}>{description}</ReactMarkdown>
				</div>
				<div className={s.design}>
					<div className={s.cat}>
						<Image
							src={PhotoAPI + url}
							alt={alt}
							width={width}
							height={height}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
