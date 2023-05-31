import type { ICategory } from './CategoriesTypes';

export interface IVacancyKeywordTag {
  id: number;
  attributes: {
    keyPhrase: string;
    createdAt: Date;
    publishedAt: Date;
    updatedAt: Date;
  };
}

export interface SeoData {
  id: number;
  seoTitle: string;
  seoDescription: string;
}

export interface IVacancyAttributes {
  cardDescription: string;
  categories: {
    data: ICategory[];
  };
  createdAt: Date;
  description: string;
  formTitle: string;
  isHot: boolean;
  keyword_tags: { data: IVacancyKeywordTag[] };
  locale: string;
  localizations: { data: unknown[] };
  publishedAt: Date;
  subTitle: string;
  title: string;
  titleH1: string;
  updatedAt: Date;
  vacancySlug: string;
  videoLink: string;
  videoPreview: { data: unknown };
  seoData?: SeoData;
  newVersion: boolean;
}

export interface IVacancy {
  attributes: IVacancyAttributes;
  id: number;
}

interface IVacansInfoLocales {
  allVacancies: string;
  button: string;
  categoriesTitle: string;
  createdAt: Date;
  headerPlaceholder: string;
  hotVacancies: string;
  isHotValue: string;
  locale: string;
  mobileHeaderPlaceholder: string;
  oopsDescription: string;
  oopsTitle: string;
  placeholder: string;
  salary: string;
  title: string;
  updatedAt: Date;
}
export interface IVacanciesInfo extends IVacansInfoLocales {
  localizations: { data: { id: number; attributes: IVacansInfoLocales }[] };
}
