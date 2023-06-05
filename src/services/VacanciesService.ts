import axios from 'axios';
import { API, requestPagLimit, requestPagStart } from '@/constants';
import type { IVacanciesInfo, IVacancy } from '@/shared/types/VacanciesTypes';

type Error = any;

const instance = axios.create({
  baseURL: API,
});

export const getVacancyListData = async (locale: string): Promise<IVacanciesInfo | Error> => {
  try {
    const res = await instance.get(`/vacancy-list-data`, { params: { locale, populate: '*' } });
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
    populate: '*',
  };

  try {
    const vacanciesPage = await instance.get(`/vacancies`, { params });
    const resultVacancies: IVacancy[] = [...vacanciesPage.data.data];

    const { total } = vacanciesPage.data.meta.pagination;
    if (total <= perPage) return resultVacancies;

    for (let i = perPage; i < total; i += perPage) {
      const nextPage = await instance.get(`/vacancies`, {
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

export const getVacancy = async (locale: string, slug: string) => {
  const params = {
    locale,
    ['filters[vacancySlug][$eq]']: slug,
    ['populate[products][populate]']: '*',
    ['populate[responsibilities][populate]']: '*',
    ['populate[tools][populate]']: '*',
    populate: '*',
  };
  try {
    const res = await instance.get(`/vacancies`, { params });
    return res.data.data[0] as Promise<IVacancy>;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getVacancyPageData = async (locale: string) => {
  try {
    const res = await instance.get(`/vacancy-page`, { params: { locale, populate: '*' } });
    return res.data.data.attributes as Promise<{}>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
