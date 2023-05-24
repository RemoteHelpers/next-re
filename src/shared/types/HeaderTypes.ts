import type { ICategory } from './CategoriesTypes';
import type { IVacancy } from './VacanciesTypes';

export interface IMenu {
  id: number;
  path_id: string;
  title: string;
}
interface ILocalization {
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

export interface IHeader extends ILocalization {
  menu: IMenu[];
  localizations: { data: { id: number; attributes: ILocalization }[] };
}

export interface IHeaderData {
  header: IHeader;
  categories: ICategory[];
  vacancies: IVacancy[];
}
