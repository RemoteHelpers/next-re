import { IVacancy } from "./VacanciesTypes";

export interface ICategoryAttributes {
	categorySlug: string;
	categoryTitle: string;
	createdAt: Date;
	description: string;
	locale: string;
	publishedAt: Date;
	updatedAt: Date;
	vacancies?: { data: IVacancy[] } | undefined;
}

export interface ICategory {
	id: number;
	attributes: ICategoryAttributes;
}
