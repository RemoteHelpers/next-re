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

export interface IVacancySEO {
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
  newVersion: boolean;
  products: {
    id: number;
    productImg?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          height: number;
          width: number;
          url: string;
        };
      };
    };
    productText: string;
    productTitle: string;
  }[];
  productsTitle: string;
  localizations?: { data: unknown[] };
  publishedAt: Date;
  responsibilities: {
    id: 1;
    responsibilityLi: string;
  }[];
  responsibilityTitle: string;
  subTitle: string;
  title: string;
  titleH1: string;
  tools: {
    id: 1;
    toolImg?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          height: number;
          width: number;
          url: string;
        };
      };
    };
  }[];
  toolText: string;
  toolsTitle: string;
  updatedAt: Date;
  vacancySlug: string;
  videoLink: string;
  videoPreview: { data: unknown };
  seoData?: SeoData;
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

export interface IVacancyPageData {
  createdAt: string;
  description: string;
  fifthDescription: string;
  fifthTitle: string;
  firstImage: {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText: string;
        height: number;
        width: number;
        url: string;
      };
    };
  };
  forthDescription: string;
  fouthTitle: string;
  listTitle: string;
  locale: string;
  publishedAt: string;
  requirements: string;
  secondDescription: string;
  secondImage: {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText: string;
        height: number;
        width: number;
        url: string;
      };
    };
  };
  secondTitle: string;
  thirdDescription: string;
  thirdImage: {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText: string;
        height: number;
        width: number;
        url: string;
      };
    };
  };
  thirdTitle: string;
  title: string;
  updatedAt: string;
}
