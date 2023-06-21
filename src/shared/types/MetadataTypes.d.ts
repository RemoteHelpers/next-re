import { LocalesLiteral } from './CommonTypes';

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
