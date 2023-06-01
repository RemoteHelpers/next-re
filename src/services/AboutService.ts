import axios from 'axios';
import { API } from '@/constants';
import type { IAbout } from '@/shared/types/AboutTypes';

const db = axios.create({
  baseURL: API,
  params: {
    populate: '*',
  },
});

export const getAboutData = async (locale: string): Promise<IAbout | any> => {
  try {
    const res = await db.get(`/about-us`, { params: { locale } });
    return res.data.data.attributes;
  } catch (error) {
    console.error(error);
    return error;
  }
};
