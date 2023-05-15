import React from "react";
import s from "./Category.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type CategoryProps = {};

export const Category = (props: CategoryProps) => {
	return (
		<section className={s.category}>
			<div className={s.container}>
				<h1 className={s.title}></h1>
				<ReactMarkdown className={s.description}>react</ReactMarkdown>
			</div>
		</section>
	);
};
