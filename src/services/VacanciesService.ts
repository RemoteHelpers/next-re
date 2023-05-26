import axios from 'axios';
import { API, requestPagLimit, requestPagStart } from '@/constants';

const vacanciesInstance = axios.create({
  baseURL: API,
  params: {
    populate: '*',
  },
});

export const getVacancyListData = async (lang: string) => {
  try {
    const res = await vacanciesInstance.get(`/vacancy-list-data?locale=${lang}`);
    return res.data.data.attributes as Promise<{}>;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAllVacancies = async (lang = 'ru') => {
  const pageStart = 0;
  const perPage = 100;

  try {
    const vacanciesPage = await vacanciesInstance.get(
      `/vacancies?locale=${lang}&${requestPagStart}=${pageStart}&${requestPagLimit}=${perPage}`
    );
    const resultVacancies = [...vacanciesPage.data.data];

    const { total } = vacanciesPage.data.meta.pagination;
    if (total <= perPage) return resultVacancies;

    for (let i = perPage; i < total; i += perPage) {
      const nextPage = (await vacanciesInstance.get(
        `/vacancies?locale=${lang}&${requestPagStart}=${i}&${requestPagLimit}=${perPage}`
      )) as any;

      resultVacancies.push(...nextPage.data.data);
    }
    return resultVacancies;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getVacancies = async (lang: string, pageStart = 0, perPage = 25) => {
  try {
    const res = await vacanciesInstance.get(
      `/vacancies?locale=${lang}&${requestPagStart}=${pageStart}&${requestPagLimit}=${perPage}`
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
      `/vacancies?locale=${lang}&filters[vacancySlug][$eq]=${slug}`
    );
    return res.data.data[0] as Promise<{}>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
