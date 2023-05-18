import axios from 'axios';
import { API } from '@/constants';

const instance = axios.create({
  baseURL: API,
  params: {
    populate: '*',
  },
});

export const getHeaderData = async (lang: string) => {
  try {
    const res = await instance.get(`/header?locale=${lang}`);
    return res.data.data as Promise<{}>;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
