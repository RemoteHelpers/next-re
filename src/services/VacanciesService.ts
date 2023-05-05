import axios from 'axios';
import { API, requestPagLimit, requestPagStart } from '@/constants';

const vacanciesInstance = axios.create({
  baseURL: API,
});

export const getCategories = async (lang: string) => {
  try {
    const res = await vacanciesInstance.get(`/categories?populate=*&locale=${lang}`);
    return res.data.data as Promise<[]>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getVacancyListData = async (lang: string) => {
  try {
    const res = await vacanciesInstance.get(`/vacancy-list-data?populate=*&locale=${lang}`);
    return res.data.data.attributes as Promise<{}>;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCurrentVacancies = async ({ lang, pageStart, perPage }: any) => {
  try {
    const res = await vacanciesInstance.get(
      `/vacancies?populate=*&locale=${lang}&${requestPagStart}=${pageStart}&${requestPagLimit}=${perPage}`
    );

    return res.data as Promise<[]>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getVacancies = async (lang: string, pageStart = 0, perPage = 25) => {
  try {
    const res = await vacanciesInstance.get(
      `/vacancies?populate=*&locale=${lang}&${requestPagStart}=${pageStart}&${requestPagLimit}=${perPage}`
    );

    return res.data.data as Promise<[]>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getVacancy = async (lang: string, slug: string) => {
  try {
    const res = await vacanciesInstance.get(
      `/vacancies?populate=*&locale=${lang}&filters[vacancySlug][$eq]=${slug}`
    );
    return res.data.data[0] as Promise<{}>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
