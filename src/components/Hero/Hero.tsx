import type { FC } from "react";
import { InfoBlock } from "./components/InfoBlock";
import { DesignBlock } from "./components/DesignBlock";
import s from "./Hero.module.scss";

interface HeroProps {
	data: any;
	formRef: any;
}

export const Hero: FC<HeroProps> = ({ data, formRef }: HeroProps) => {
	return (
		<section className={s.hero}>
			<div className={s.container}>
				<DesignBlock data={data} />
				<InfoBlock data={data} formRef={formRef} />
			</div>
		</section>
	);
};
