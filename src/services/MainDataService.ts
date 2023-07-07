import axios from 'axios';
import { API } from '@/constants';
import { getAllVacancies } from './VacanciesService';

const instance = axios.create({ baseURL: API, params: { populate: '*' } });
const locales = ['uk', 'pl', 'en', 'sk', 'ru'];

const getPromise = (brakepoint: string, locale: string) => {
  return instance.get(brakepoint, { params: { locale } });
};

const generateData = (data: any) => {
  return {
    uk: data[0].data.data.attributes,
    pl: data[1].data.data.attributes,
    en: data[2].data.data.attributes,
    sk: data[3].data.data.attributes,
    ru: data[4].data.data.attributes,
  };
};

// return {
//   uk: uk.data.data.attributes,
//   pl: pl.data.data.attributes,
//   en: en.data.data.attributes,
//   sk: sk.data.data.attributes,
//   ru: ru.data.data.attributes,
// };

// : Promise<HeaderData> | Error
export const getFullHeaderData = async () => {
  try {
    const res = await Promise.all(locales.map(locale => getPromise('/header', locale)));
    return generateData(res);
  } catch (error) {
    console.error('Error >>> ', error);
    return error;
  }
};

export const getFullFooterData = async () => {
  try {
    const res = await Promise.all(locales.map(locale => getPromise('/footer', locale)));
    return generateData(res);
  } catch (error) {
    console.error('Error >>> ', error);
    return error;
  }
};

export const getFullFormData = async () => {
  try {
    const res = await Promise.all(locales.map(locale => getPromise('/form', locale)));
    return generateData(res);
  } catch (error) {
    console.error('Error >>> ', error);
    return error;
  }
};

export const getFullVacanciesData = async () => {
  const [uk, pl, en, sk, ru] = await Promise.all(locales.map(locale => getAllVacancies(locale)));
  return { uk, pl, en, sk, ru };
};
