import type { IImgAttributes } from './CommonTypes';

export interface IFeedbackFormData {
  name?: string;
  number?: string;
  age?: string;
  englishLevel?: string;
  eMail?: string;
  CV?: any;
  CV_url?: string;
  pageFrom?: string;
  cv_link?: string;
}

export interface IFileInfo {
  name: string;
  caption: string;
  alternativeText: string;
  folder: string | null;
}
export interface IStateCV extends IImgAttributes {
  id: number;
}

export interface IUploadFile {
  files: any;
  fileInfo?: IFileInfo;
}

export interface IFormDataLocalization {
  age: string;
  createdAt: Date;
  cv: string;
  cvLink: string;
  email: string;
  englishLabel: string;
  englishLevel: string;
  locale: string;
  name: string;
  number: string;
  respondBtn: string;
  submit: string;
  title: string;
  updatedAt: Date;
}

export interface IEnglishLevel {
  id: number;
  label: string;
  value: string;
}

export interface IFormData extends IFormDataLocalization {
  localizations: { data: { id: number; attributes: IFormDataLocalization[] } };
  enlishLevels: IEnglishLevel[];
}
