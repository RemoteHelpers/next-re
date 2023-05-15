import React from "react";
import s from "./Category.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type CategoryProps = {
	category: any;
	header: any;
};

export const Category = ({ category, header }: CategoryProps) => {
	const { categoryTitle, description } = category.attributes;
	return (
		<section className={s.category}>
			<div className={s.container}>
				<div className={s.content}>
					<h1 className={s.title}>{categoryTitle}</h1>
					<ReactMarkdown className={s.description}>{description}</ReactMarkdown>
                    <button className={s.btn}>{header?.categoryButton}</button>
                    <div className={s.vacancies_list}>
                        
                    </div>
				</div>
			</div>
		</section>
	);
};
