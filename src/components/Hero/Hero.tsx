import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import s from "./Hero.module.scss";
import Image from "next/image";
import round from "@/shared/images/home/hero/blue_round.svg";
import crazy_cat from "@/shared/images/home/hero/crazy_cat.svg";
import bag from "@/shared/icons/home/hero/bag.svg";


interface HeroProps {
	data: any;
}

export const Hero: FC<HeroProps> = ({ data }: HeroProps) => {
	return (
		<section className={s.hero}>
			<div className={s.container}>
				<div className={s.design}>
					<div className={s.round}>
						<Image src={round} alt="round"></Image>
						<div className={s.cat}>
							<Image
								src={crazy_cat}
								alt="crazy_cat"
								width={100}
								height={100}></Image>
						</div>
					</div>
				</div>
				<div className={s.info}>
					<h1 className={s.title}>{data.mainScreenTitle}</h1>
					<ReactMarkdown className={s.description}>{data.mainScreenParagraph}</ReactMarkdown>
                    <button className={s.btn}>{data.mainScreenButton}
                        <Image src={bag} width={20} height={20} alt="bag"/>
                    </button>
				</div>
			</div>
		</section>
	);
};
