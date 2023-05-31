export type TFeedbackFormData = {
  name?: string;
  number?: string;
  age?: string;
  englishLevel?: string;
  eMail?: string;
  CV?: any;
  CV_url?: string;
  pageFrom?: string;
  cv_link?: string;
};

export type TUploadFile = {
  files: any;
  fileInfo?: {
    name: string;
    caption: string;
    alternativeText: string;
    folder: string | null;
  };
};