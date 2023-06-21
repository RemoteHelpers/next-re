import { IFooterData } from './FooterTypes';
import { IFormData } from './FormTypes';
import { IHeader } from './HeaderTypes';
import { IVacancy } from './VacanciesTypes';

export type LocalesLiteral = 'uk' | 'pl' | 'en' | 'sk' | 'ru';

export interface IMainData {
  header: IHeader;
  footer: IFooterData;
  vacancies: IVacancy[];
  formData: IFormData;
}

export interface IGlobalData extends IMainData {
  setNavURL: (url: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

interface IImgFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: unknown;
  size: number;
  url: string;
  width: number;
}

interface IImageFormats {
  small?: IImgFormat;
  medium?: IImgFormat;
  large?: IImgFormat;
  thumbnail: IImgFormat;
}

export interface IImgAttributes {
  alternativeText: string;
  caption: string;
  createdAt: Date;
  ext: string;
  formats: IImageFormats;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: unknown;
  provider: string;
  provider_metadata: unknown;
  size: number;
  updatedAt: Date;
  url: string;
  width: number;
}

export interface IImage {
  id: number;
  attributes: IImgAttributes;
}

export interface IImageData {
  data: IImage;
}
