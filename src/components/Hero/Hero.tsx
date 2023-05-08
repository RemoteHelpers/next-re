import type { FC } from "react";
import { InfoBlock } from "./components/InfoBlock";
import { DesignBlock } from "./components/DesignBlock";
import s from "./Hero.module.scss";



interface HeroProps {
	data: any;
}

export const Hero: FC<HeroProps> = ({ data }: HeroProps) => {
	return (
		<section className={s.hero}>
			<div className={s.container}>	
				<DesignBlock data={data}/>	
				<InfoBlock data={data} />				
			</div>
		</section>
	);
};
