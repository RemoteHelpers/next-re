import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API, requestPagStart, requestPagLimit } from '@/constants';

type AllVacansParams = {
  lang: string;
  pageStart?: number;
  perPage?: number;
};
type VacansyBySlugParams = {
  lang: string;
  slug: string;
};

const vacanciesInstance = axios.create({
  baseURL: `${API}/vacancies?populate=*`,
});

export const getVacancies: AsyncThunk<any, string, any> = createAsyncThunk(
  'vacancies/getAll',
  async (lang: string) => {
    try {
      const res = await vacanciesInstance.get(`&locale=${lang}`);

      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getVacanciesPage: AsyncThunk<any, AllVacansParams, any> = createAsyncThunk(
  'vacancies/getPerPage',
  async ({ lang, pageStart = 0, perPage = 25 }) => {
    try {
      const res = await vacanciesInstance.get(
        `&locale=${lang}&${requestPagStart}=${pageStart}&${requestPagLimit}=${perPage}`
      );

      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getVacancyBySlug: AsyncThunk<any, VacansyBySlugParams, any> = createAsyncThunk(
  'vacancies/getBySlug',
  async ({ lang, slug }) => {
    try {
      const res = await vacanciesInstance.get(`&locale=${lang}&filters[vacancySlug][$eq]=${slug}`);

      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
