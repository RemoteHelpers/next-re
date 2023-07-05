import type { IImage, LocalesLiteral } from './CommonTypes';

interface IThankYou {
  buttonLink: string;
  createdAt: Date;
  linkText: string;
  linkViber: string;
  locale: LocalesLiteral;
  paragraph: string;
  paragraphViber: string;
  publishedAt: Date;
  subTitle: string;
  title: string;
  titleViber: string;
  updatedAt: Date;
}

export interface IThankYouData extends IThankYou {
  localizations: { data: { id: number; attributes: IThankYou }[] };
  thankYouCat: { data: { id: number; attributes: IImage }[] };
}
