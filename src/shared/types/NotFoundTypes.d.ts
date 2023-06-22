import type { IImage, LocalesLiteral } from './CommonTypes';

interface INotFoundAttr {
  createdAt: Date;
  link1: string;
  link2: string;
  locale: LocalesLiteral;
  publishedAt: Date;
  subTitle: string;
  title: string;
  updatedAt: Date;
}

export interface INotFoundData extends NotFoundAttr {
  localizations: { data: { id: number; attributes: NotFoundAttr }[] };
  notFoundCat: { data: IImage[] };
}
