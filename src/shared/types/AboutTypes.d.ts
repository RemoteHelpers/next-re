export interface IAbout {
  firstDescription: string;
  title: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  locale: string;
  WhatWeDoTitle: string;
  SecondDescription: string;
}

export interface IAboutData {
  id: number;
  attributes: IAbout;
}
