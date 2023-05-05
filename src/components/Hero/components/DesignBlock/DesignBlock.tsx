import Image from "next/image";
import type { FC } from "react";
import s from "./DesignBlock.module.scss";
import round from "@/shared/images/home/hero/blue_round.svg";
import crazy_cat from "@/shared/images/home/hero/crazy_cat.svg";
import bag from "@/shared/icons/home/hero/bag.svg";
import employee from "@/shared/icons/home/hero/employee.svg";
import like from "@/shared/icons/home/hero/like.svg";
import smile from "@/shared/icons/home/hero/smile.svg";
import globe from "@/shared/icons/home/hero/globe.svg";
import { PhotoAPI } from "@/constants";
import { StatItem } from "./components/StatItem";

interface DesignBlockProps {
	data: any;
}

export const DesignBlock: FC<DesignBlockProps> = ({
	data,
}: DesignBlockProps) => {
	return (
		<div className={s.design}>
			<div className={s.round}>
                {data.heroStats.map((item: any, index: number, array: []) => (
                    <StatItem
                        key={item.id}
                        id={index + ''}
						image={item.heroStatIcon.data.attributes}
						value={item.heroStatValue}
						text={item.heroStatText}
					/>
				))}				
				<div className={s.icon} id={s.like}>
					<Image src={like} alt="like" />
				</div>
				<div className={s.icon} id={s.smile}>
					<Image src={smile} alt="smile" />
				</div>
				<div className={s.globe}>
					<Image src={globe} alt="globe" />
				</div>
			</div>
			<div className={s.background}>
				<Image src={round} alt="blue bg"></Image>
				<div className={s.cat}>
					<Image src={crazy_cat} alt="crazy_cat"></Image>
				</div>
			</div>
		</div>
	);
};
