interface IAltLinkConfig {
  DOMAIN: string;
  MAP_LOCALE: string;
}

export interface IAltLink extends IAltLinkConfig {
  languagesList: ILanguage[];
  mainRoute?: string;
  minorRoute?: string;
}

export interface IGenerConfig extends IAltLinkConfig {
  header: IHeader;
  categories: ICategory[];
  vacancies: IVacancy[];
}
