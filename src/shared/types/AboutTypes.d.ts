interface IAboutAttributes {
  firstDescription: string;
  title: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  locale: string;
  WhatWeDoTitle: string;
  SecondDescription: string;

  aboutCompanyTitle: string;
  aboutCompanyDescription: string;
  whyUsTitle: string;
  whyUsDescription: string;
  joinText: string;
  features: {
    count: string;
    description: string;
  }[];
  learnMoreText: string;
}

export interface IAboutLocalization {
  id: number;
  attributes: IAboutAttributes;
}

export interface IAboutData extends IAboutAttributes {
  localizations: { data: IAboutLocalization[] };
}
