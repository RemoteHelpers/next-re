export interface IFaqQuestion {
  Answer: string;
  Question: string;
  id: number;
}

interface IImgFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: unknown;
  size: number;
  url: string;
  width: number;
}

interface IFormats {
  small?: IImgFormat;
  medium?: IImgFormat;
  large?: IImgFormat;
  thumbnail: IImgFormat;
}

export interface IPersonImgAttributes {
  alternativeText: string;
  caption: string;
  createdAt: Date;
  ext: string;
  formats: IFormats;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: unknown;
  provider: string;
  provider_metadata: unknown;
  size: number;
  updatedAt: Date;
  url: string;
  width: number;
}

export interface IPersonImg {
  data: { id: number; attributes: IPersonImgAttributes };
}

export interface ITestimonial {
  Description: string;
  Position: unknown;
  Specialization: string;
  id: number;
  name: string;
  personImg: IPersonImg;
}

export interface IHeroStat {
  heroStatIcon: {
    data: {
      id: number;
      attributes: {
        alternativeText: string;
        caption: string;
        createdAt: Date;
        ext: string;
        formats: unknown;
        hash: string;
        height: number;
        mime: string;
        name: string;
        previewUrl: unknown;
        provider: string;
        provider_metadata: unknown;
        size: number;
        updatedAt: Date;
        url: string;
        width: number;
      };
    };
  };
  heroStatText: string;
  heroStatValue: string;
  id: number;
}

export interface IPartnersSliderAttributes {
  alternativeText: string;
  caption: string;
  createdAt: Date;
  ext: string;
  formats?: IFormats;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: unknown;
  provider: string;
  provider_metadata: unknown;
  size: number;
  updatedAt: Date;
  url: string;
  width: number;
}

export interface IPartnersSlider {
  id: number;
  attributes: IPartnersSliderAttributes;
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
  partnersSlider: { data: IPartnersSlider[] };
  partnersTitle: string;
  spheresTitle: string;
  testimonialsTitle: string;
  updatedAt: Date;
}
