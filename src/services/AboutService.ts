import axios from 'axios';
import { API } from '@/constants';
import type { IAbout } from '@/shared/types/AboutTypes';

const db = axios.create({
  baseURL: API,
  params: {
    populate: '*',
    locale: 'ru',
  },
});

export const getAboutData = async (locale: string) => {
  try {
    const res = await db.get(`/about-us`, { params: { locale } });
    return res.data.attributes;
  } catch (error) {
    console.error(error);
    return error;
  }
};
