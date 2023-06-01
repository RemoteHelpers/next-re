import axios from "axios";
import { API, requestPagLimit, requestPagStart } from "@/constants";

const vacanciesInstance = axios.create({
	baseURL: API,
});

export const getCategories = async (lang: string) => {
	try {
		const res = await vacanciesInstance.get(
			`/categories?locale=${lang}&populate=*`
		);
		return res.data.data as Promise<[]>;
	} catch (error) {
		console.error(error);
		return error;
	}
};
export const getVacancyListData = async (lang: string) => {
	try {
		const res = await vacanciesInstance.get(
			`/vacancy-list-data?locale=${lang}&populate=*`
		);
		return res.data.data.attributes as Promise<{}>;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const getAllVacancies = async (lang: any) => {
	const pageStart = 0;
	const perPage = 100;

	try {
		const vacanciesPage = await vacanciesInstance.get(
			`/vacancies?locale=${lang}&${requestPagStart}=${pageStart}&${requestPagLimit}=${perPage}&populate=*`
		);
		const resultVacancies = [...vacanciesPage.data.data];

		const { total } = vacanciesPage.data.meta.pagination;
		if (total <= perPage) return resultVacancies;

		for (let i = perPage; i < total; i += perPage) {
			const nextPage = (await vacanciesInstance.get(
				`/vacancies?locale=${lang}&${requestPagStart}=${i}&${requestPagLimit}=${perPage}&populate=*`
			)) as any;

			resultVacancies.push(...nextPage.data.data);
		}
		return resultVacancies;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const getVacancies = async (
	lang: string,
	pageStart = 0,
	perPage = 25
) => {
	try {
		const res = await vacanciesInstance.get(
			`/vacancies?locale=${lang}&${requestPagStart}=${pageStart}&${requestPagLimit}=${perPage}&populate=*`
		);

		return res.data as Promise<{}>;
		// return res.data.data as Promise<[]>;
	} catch (error) {
		console.error(error);
		return error;
	}
};
export const getVacancy = async (lang: string, slug: string) => {
	try {
		const res = await vacanciesInstance.get(
			`/vacancies?locale=${lang}&filters[vacancySlug][$eq]=${slug}&populate[products][populate]=*&populate[responsibilities][populate]=*&populate[tools][populate]=*`
		);
		return res.data.data[0] as Promise<{}>;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const getVacancyPageData = async (lang: string) => {
	try {
		const res = await vacanciesInstance.get(
			`/vacancy-page?locale=${lang}&populate=*`
		);
		return res.data.data.attributes as Promise<{}>;
	} catch (error) {
		console.error(error);
		return error;
	}
};