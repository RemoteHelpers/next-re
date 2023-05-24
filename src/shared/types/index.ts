// Interface for a vacancy
export interface IVacancy {
  id: number;
  attributes: IVacancyAttr;
}
/* Additional interfaces for a vacancy interface */
export interface IVacancyAttr {
  cardDescription: string;
  categories: ICatData;
  createdAt: string;
  description: string;
  isHot: boolean;
  keyword_tags: IKeywordData;
  locale: string;
  localizations: ILocalsData;
  publishedAt: string;
  subTitle: string;
  title: string;
  titleH1: string;
  updatedAt: string;
  vacancySlug: string;
  videoLink: string;
  videoPreview: IVideoPreviewData;
}
export interface ICatData {
  data: IVacCat[];
}
export interface IVacCat {
  id: number;
  attributes: ICatAttr;
}
export interface ICatAttr {
  categorySlug: string;
  categoryTitle: string;
  createdAt: string;
  description: string;
  locale: string;
  publishedAt: string;
  updatedAt: string;
  vacancies?: IVacanciesData;
}
export interface IVacanciesData {
  data: IVacancy[];
}
export interface IKeywordData {
  data: [];
}
export interface ILocalsData {
  data: [];
}
export interface IVideoPreviewData {
  data: {};
}
/* End of additional interfaces for a vacancy interface*/
