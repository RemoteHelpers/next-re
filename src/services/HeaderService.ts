import axios from 'axios';
import { API } from '@/constants';
import { IHeader } from '@/shared/types/HeaderTypes';

type Error = any;

const instance = axios.create({
  baseURL: API,
  params: {
    populate: '*',
  },
});

export const getHeaderData = async (locale: string = 'uk'): Promise<IHeader | Error> => {
  try {
    const res = await instance.get(`/header`, { params: { locale } });
    return res.data.data.attributes;
  } catch (error) {
    console.error(error);
    return error;
  }
};
