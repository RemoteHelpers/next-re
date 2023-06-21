import axios, { AxiosResponse } from 'axios';
import { API } from '@/constants';
import type { IAboutData } from '@/shared/types/AboutTypes';

const db = axios.create({
  baseURL: API,
  params: {
    populate: '*',
  },
});

export const getAboutData = async (locale: string): Promise<IAboutData | any> => {
  try {
    const res: AxiosResponse = await db.get(`/about-us`, { params: { locale } });
    return res.data.data.attributes;
  } catch (error) {
    console.error(error);
    return error;
  }
};
