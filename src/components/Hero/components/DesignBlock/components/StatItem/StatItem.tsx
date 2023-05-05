import type { FC } from "react";
import s from "./StatItem.module.scss";
import Image from "next/image";
import { PhotoAPI } from "@/constants";

interface StatItemProps {
	id: any;
	image: any;
	value: string;
	text: string;
}

export const StatItem: FC<StatItemProps> = ({
	id,
	image,
	value,
	text,
}: StatItemProps) => {
	return (
		<div className={s.stat_item} id={id}>
			<div className={s.fill_icon}>
				<Image
					src={PhotoAPI + image.url}
					alt={image.alternativeText}
					width={image.width}
					height={image.height}></Image>
			</div>
			<div className={s.stats}>
				<div className={s.value}>{value}</div>
				<div className={s.text}>{text}</div>
			</div>
		</div>
	);
};
