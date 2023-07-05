// import { getAllVacancies, getFooterData, getFormData, getHeaderData } from '@/services';
// import type { IMainData, INavUrlState } from '../types';

// const getDataByLocale = async (locale: string, initialData: IMainData, navUrlState: INavUrlState) => {
//   'use server';
//   if (locale === 'ru') return initialData;

//   const [header, footer, vacancies, formData] = await Promise.all([
//     getHeaderData(locale),
//     getFooterData(locale),
//     getAllVacancies(locale),
//     getFormData(locale),
//   ]);

//   const dataByLocale: IMainData = {
//     header,
//     footer,
//     vacancies,
//     formData,
//   };
//   return dataByLocale;
// };

// export default getDataByLocale;
