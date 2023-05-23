import type { ICategory } from './CategoriesTypes';

export type IVacancyAttributes = {
  cardDescription: string;
  categories: {
    data: ICategory[];
  };
  createdAt: Date;
  description: string;
  formTitle: string;
  isHot: boolean;
  keyword_tags: { data: any[] };
  locale: string;
  localizations: { data: any[] };
  publishedAt: Date;
  subTitle: string;
  title: string;
  titleH1: string;
  updatedAt: Date;
  vacancySlug: string;
  videoLink: string;
  videoPreview: { data: unknown };
};

export interface IVacancy {
  attributes: IVacancyAttributes;
  id: number;
}
