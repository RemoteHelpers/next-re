import axios from 'axios';
import { API } from '@/constants';
import type { IAbout } from '@/shared/types/AboutTypes';

const about = axios.create({
  baseURL: API,
  params: {
    populate: '*',
  },
});

export const getAboutData = async (locale: string) => {
  try {
    const res = await about.get(`/about-us`, { params: { locale } });
    return res.data.attributes as Promise<IAbout>;
  } catch (error) {
    console.error(error);
    return error;
  }
};
