export type Category = {
  id: number;
  attributes: {
    categorySlug: string;
    categoryTitle: string;
    createdAt: Date;
    description: string;
    locale: string;
    publishedAt: Date;
    updatedAt: Date;
  };
};

export type Vacancy = {
  attributes: {
    cardDescription: string;
    categories: {
      data: Category[];
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
    videoPreview: { data: null };
  };
  id: number;
};

export interface IVacancy {
  id: number;
  attributes: IVacancyAttr;
}
export interface IVacancyAttr {
  title: string;
  subTitle: string;
  cardDescription: string;
  isHot: boolean;
  vacancySlug: string;
  videoLink: string;
  categories: ICatData;
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
}
