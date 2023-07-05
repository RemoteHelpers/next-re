import axios from 'axios';
import type { IVacancy } from '@/shared/types';
import { API, requestPagLimit, requestPagStart } from '@/constants';

// type Error = any;
// type HeaderData = { [x: string]: IHeader };
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

// : Promise<HeaderData> | Error
export const getFullHeaderData = async () => {
  try {
    const [uk, pl, en, sk, ru] = await Promise.all(
      locales.map(locale => getPromise('/header', locale))
    );

    return {
      uk: uk.data.data.attributes,
      pl: pl.data.data.attributes,
      en: en.data.data.attributes,
      sk: sk.data.data.attributes,
      ru: ru.data.data.attributes,
    };
  } catch (error) {
    console.error(error);
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
    //   const res = await instance.get(`/form?locale=${lang}&populate=*`);
    const [uk, pl, en, sk, ru] = await Promise.all(
      locales.map(locale => getPromise('/form', locale))
    );

    return {
      uk: uk.data.data.attributes,
      pl: pl.data.data.attributes,
      en: en.data.data.attributes,
      sk: sk.data.data.attributes,
      ru: ru.data.data.attributes,
    };

    // return res.data.data.attributes;
  } catch (error) {
    console.error('Error >>> ', error);
    return error;
  }
};

// : Promise<IVacancy[] | Error>
// export const getAllVacancies = async (locale: string, pop: string = '*') => {
//   const pageStart = 0;
//   const perPage = 100;
//   const params = {
//     locale,
//     [requestPagStart]: pageStart,
//     [requestPagLimit]: perPage,
//     populate: pop,
//   };

//   try {
//     const vacanciesPage = await instance.get(`/vacancies`, { params });
//     const resultVacancies: IVacancy[] = [...vacanciesPage.data.data];

//     const { total } = vacanciesPage.data.meta.pagination;
//     if (total <= perPage) return resultVacancies;

//     for (let i = perPage; i < total; i += perPage) {
//       const nextPage = await instance.get(`/vacancies`, {
//         params: { ...params, [requestPagStart]: i },
//       });
//       resultVacancies.push(...nextPage.data.data);
//     }

//     return resultVacancies;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };
