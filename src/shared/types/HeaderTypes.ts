import type { ICategory } from './CategoriesTypes';
import type { IVacancy } from './VacanciesTypes';

export interface ILocalization {
  allVacanciesValue: string;
  backValue: string;
  categoryButton: string;
  chooseLangValue: string;
  commonVacancyDetails: unknown;
  createdAt: Date;
  isHotValue: string;
  locale: string;
  menuValue: string;
  meta: string;
  seeMore: string;
  updatedAt: Date;
}

export interface IMenu {
  id: number;
  path_id: string;
  title: string;
}

export interface IHeader {
  allVacanciesValue: string;
  backValue: string;
  categoryButton: string;
  chooseLangValue: string;
  commonVacancyDetails: unknown;
  createdAt: Date;
  isHotValue: string;
  locale: string;
  localizations: ILocalization;
  menu: IMenu[];
  menuValue: string;
  meta: string;
  seeMore: string;
  updatedAt: Date;
}

export interface IHeaderData {
  header: IHeader;
  categories: ICategory[];
  vacancies: IVacancy[];
}
