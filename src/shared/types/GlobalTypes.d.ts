export interface IMainData {
  header: IHeader;
  footer: IFooterData;
  vacancies: IVacancy[];
  formData: IFormData;
}

export interface IGlobalData extends IMainData {
  setNavURL: (url: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  // navURL: string;
  // isLoading: boolean;
  // currentLang: string;
  // setCurrentLang: (lang: string) => void;
}
