import { LocalesLiteral } from './CommonTypes';

export interface IMetadata {
  title: string;
  description: string;
  locale: string;
  url: string;
  image: string;
  sitename: string;
}

export type AppMetadata = Record<LocalesLiteral, IMetadata>;
