import type { IImageData, LocalesLiteral } from './CommonTypes';

interface IVideoFAQ {
  Answer: string;
  Question: string;
  id: number;
}

interface IVideo {
  id: number;
  videoLink: string;
}

interface IVideointerviewAttr {
  createdAt: Date;
  firstDescription: string;
  firstVideo: string;
  locale: LocalesLiteral;
  secondDescription: string;
  secondTitle: string;
  thirdDescription: string;
  thirdTitle: string;
  title: string;
  updatedAt: Date;
  videoFaqTitle: string;
}

export interface IVideointerview extends IVideointerviewAttr {
  localizations: { data: { id: number; attributes: IVideointerviewAttr }[] };
  firstCat: IImageData;
  secondCat: IImageData;
  videoList: IVideo[];
  videointerview_faq: IVideoFAQ[];
}
