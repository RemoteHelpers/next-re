export type LocalesLiteral = 'uk' | 'pl' | 'en' | 'sk' | 'ru';

export interface IMetaData {
  title: string;
  description: string;
  canonical: string;
  og: {
    locale: string;
    title: string;
    description: string;
    url: string;
    siteName: string;
    image: string;
  };
  article: {
    modifiedTime: string;
  };
  twitter: {
    label1: string;
    data1: string;
  };
}

export type AppMetadata = Record<LocalesLiteral, IMetaData>;

export interface ISeoData {
  seoTitle?: string;
  seoDescription?: string;
}
