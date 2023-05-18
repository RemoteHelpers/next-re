import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import s from "./InfoBlock.module.scss";
import bag from "@/shared/icons/home/hero/bag.svg";
import Image from "next/image";

interface InfoBlockProps {
	data: any;
}

export const InfoBlock: FC<InfoBlockProps> = ({ data }: InfoBlockProps) => {
	return (
		<div className={s.info}>
			<h1 className={s.title}>{data.mainScreenTitle}</h1>
			<ReactMarkdown className={s.description}>
				{data.mainScreenParagraph}
			</ReactMarkdown>
			<a className={s.btn}>
				{data.mainScreenButton}
				<span className={s.btn_icon}>
					<Image src={bag} alt="bag" />
				</span>
			</a>
		</div>
	);
};
