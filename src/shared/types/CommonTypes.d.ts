import { IFooterData } from './FooterTypes';
import { IFormData } from './FormTypes';
import { IHeader } from './HeaderTypes';
import { IVacancy } from './VacanciesTypes';

/* --------- global (as context) data types --------- */
export interface IInitialData {
  header: IHeader;
  footer: IFooterData;
  vacancies: IVacancy[];
}

export interface INavUrlState {
  navURL: string;
  setNavURL: (url: string) => void;
}

export interface IMainData extends IInitialData, INavUrlState {
  formData: IFormData;
}

export interface ILayoutData extends IInitialData, INavUrlState {
  setIsLoading: (isLoading: boolean) => void;
}

/* --------- locales types --------- */
export type LocalesLiteral = 'uk' | 'pl' | 'en' | 'sk' | 'ru';

/* --------- image types --------- */
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
