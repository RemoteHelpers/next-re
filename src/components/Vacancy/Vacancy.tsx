import { FC } from "react";
import s from "./Vacancy.module.scss";

interface VacancyProps {
	vacancy: any;
}

export const Vacancy: FC<VacancyProps> = ({ vacancy }: VacancyProps) => {
	return (
		<div className={s.container}>
			<section className={s.vacancy}>
				<h1 className={s.title}>{vacancy?.attributes.title}</h1>
			</section>
		</div>
	);
};
