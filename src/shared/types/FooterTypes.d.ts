interface IFooterDataLocalization {
  createdAt: Date;
  footerAdress: string;
  footerContacts: string;
  footerFB: string;
  footerInsta: string;
  footerMail: string;
  footerNumber: string;
  locale: string;
  publishedAt: Date;
  updatedAt: Date;
}

export interface IFooterData extends IFooterDataLocalization {
  localizations: {
    data: { id: number; attributes: IFooterDataLocalization[] };
  };
}
