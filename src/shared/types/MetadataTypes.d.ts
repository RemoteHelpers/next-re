export type LocalesLiteral = 'uk' | 'pl' | 'en' | 'sk' | 'ru';

export type AppMetadata = Record<
  LocalesLiteral,
  {
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
>;
