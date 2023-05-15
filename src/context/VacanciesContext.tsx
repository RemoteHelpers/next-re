import React, { FC, ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import type { IVacancy, Category } from '@/shared/types';
import { getCategories, getAllVacancies } from '@/services';
import { useRouter } from 'next/router';

export type ContextValue = {
  vacancies: IVacancy[];
  setVacancies: ([]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  categories: Category[];
  setCategories: (array: Category[]) => void;
};

export interface ProviderProps {
  children: ReactNode;
}

const defaultValue: ContextValue = {
  vacancies: [],
  setVacancies: () => {},
  isLoading: true,
  setIsLoading: () => {},
  categories: [],
  setCategories: () => {},
};

export const VacanciesContext = createContext<ContextValue>(defaultValue);

export const VacanciesProvider: FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [vacancies, setVacancies] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { locale } = useRouter();
  const lang = (locale === 'ua' ? 'uk' : locale) || 'ru';

  const fetchVacancies = async () => {
    try {
      const res = await getAllVacancies(lang);
      setVacancies(res);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await getCategories(lang);
      setCategories(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    // fetchVacancies();
    // fetchCategories();
    setIsLoading(false);
    // getAllVacancies(lang)
    //   .then((res: any) => {
    //     setVacancies(res);
    //     setIsLoading(false);
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //   })
    // getCategories(lang)
    //   .then((res: any) => {
    //     setCategories(res);
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, [locale]);

  const contextValue = useMemo(
    () => ({
      vacancies,
      setVacancies,
      isLoading,
      setIsLoading,
      categories,
      setCategories,
    }),
    [vacancies, isLoading, categories]
  );

  return <VacanciesContext.Provider value={contextValue}>{children}</VacanciesContext.Provider>;
};
