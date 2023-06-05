export interface IAbout {
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
}

export interface IAboutData {
  id: number;
  attributes: IAbout;
}
