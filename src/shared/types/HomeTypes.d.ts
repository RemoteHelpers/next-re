import { IImageData, IImage } from './CommonTypes';

export interface IFaqQuestion {
  Answer: string;
  Question: string;
  id: number;
}

export interface ITestimonial {
  Description: string;
  Position: unknown;
  Specialization: string;
  id: number;
  name: string;
  personImg: IImageData;
}

export interface IHeroStat {
  heroStatIcon: IImageData;
  heroStatText: string;
  heroStatValue: string;
  id: number;
}

export interface IHomeData {
  Faq_Question: IFaqQuestion[];
  Testimonials: ITestimonial[];
  createdAt: Date;
  faqTitle: string;
  heroStats: IHeroStat[];
  locale: string;
  mainScreenButton: string;
  mainScreenParagraph: string;
  mainScreenTitle: string;
  partnersSlider: { data: IImage[] };
  partnersTitle: string;
  spheresTitle: string;
  testimonialsTitle: string;
  updatedAt: Date;
}
