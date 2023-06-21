import type { IImageData } from './CommonTypes';
import type { LocalesLiteral } from './MetadataTypes';

interface IVideointerview {
  createdAt: Date;
  firstCat: IImageData;
  firstDescription: string;
  firstVideo: url;
  locale: LocalesLiteral;
  localizations: { data: [] }; // <--------------------------------
  secondCat: IImageData;
  secondDescription: string;
  secondTitle: string;
  thirdDescription: string;
  thirdTitle: string;
  title: string;
  updatedAt: Date;
  videoFaqTitle: string;
  videoList: {}[]; // <--------------------------------
  videointerview_faq: {}[]; // <--------------------------------
}
