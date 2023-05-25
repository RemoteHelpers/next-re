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
export interface IStateCV {
  alternativeText: unknown;
  caption: unknown;
  createdAt: Date;
  ext: string;
  formats: unknown;
  hash: string;
  height: unknown;
  id: number;
  mime: string;
  name: string;
  previewUrl: unknown;
  provider: string;
  provider_metadata: unknown;
  size: number;
  updatedAt: Date;
  url: string;
  width: unknown;
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
