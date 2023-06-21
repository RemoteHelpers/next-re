import { IImageData } from './CommonTypes';

export interface IRecruiter {
  id: number;
  img: IImageData;
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
