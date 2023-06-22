import { getAllVacancies, getFooterData, getFormData, getHeaderData } from '@/services';
import { IFooterData, IFormData, IHeader, IMainData, IVacancy, LocalesLiteral } from '../types';

const getDataByLocale = async (locale: string, initialData: IMainData) => {
  'use server';
  if (locale === 'ru') return initialData;

  const [header, footer, vacancies, formData] = await Promise.all([
    getHeaderData(locale),
    getFooterData(locale),
    getAllVacancies(locale),
    getFormData(locale),
  ]);

  const dataByLocale: IMainData = {
    header,
    footer,
    vacancies,
    formData,
  };
  return dataByLocale;
};

export default getDataByLocale;
