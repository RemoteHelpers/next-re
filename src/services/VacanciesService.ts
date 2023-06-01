import axios from 'axios';
import { API, requestPagLimit, requestPagStart } from '@/constants';
import type { IVacanciesInfo, IVacancy } from '@/shared/types/VacanciesTypes';

type Error = any;

const vacanciesInstance = axios.create({
  baseURL: API,
  params: {
    populate: '*',
  },
});

export const getVacancyListData = async (locale: string): Promise<IVacanciesInfo | Error> => {
  try {
    const res = await vacanciesInstance.get(`/vacancy-list-data`, { params: { locale } });
    return res.data.data.attributes;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAllVacancies = async (locale: string): Promise<IVacancy[] | Error> => {
  const pageStart = 0;
  const perPage = 100;
  const params = {
    locale,
    [requestPagStart]: pageStart,
    [requestPagLimit]: perPage,
  };

  try {
    const vacanciesPage = await vacanciesInstance.get(`/vacancies`, { params });
    const resultVacancies: IVacancy[] = [...vacanciesPage.data.data];

    const { total } = vacanciesPage.data.meta.pagination;
    if (total <= perPage) return resultVacancies;

    for (let i = perPage; i < total; i += perPage) {
      const nextPage = await vacanciesInstance.get(`/vacancies`, {
        params: { ...params, [requestPagStart]: i },
      });
      resultVacancies.push(...nextPage.data.data);
    }

    return resultVacancies;
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
    return res.data.data[0] as Promise<IVacancy>;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getVacancyPageData = async (lang: string) => {
  try {
    const res = await vacanciesInstance.get(`/vacancy-page?locale=${lang}`);
    return res.data.data.attributes as Promise<{}>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
