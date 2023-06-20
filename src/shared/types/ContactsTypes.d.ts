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

export interface IRecruiter {
  id: number;
  img: {
    data: {
      id: number;
      attributes: {
        alternativeText: string;
        caption: string;
        createdAt: Date;
        ext: string;
        formats: {
          small?: IImgFormat;
          medium?: IImgFormat;
          large?: IImgFormat;
          thumbnail: IImgFormat;
        };
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
  }; // ANYYYYYYY
  name: string;
  phoneNumber: string | unknown | number;
  telegramNickname: 'RemotEmployees_Diana';
}

export interface IContacts {
  Recruiters: IRecruiter[];
  createdAt: Date;
  description: string;
  locale: string;
  title: string;
  updatedAt: Date;
}
