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

export const GlobalContext = createContext<ContextValue>(defaultValue);

export const GlobalProvider: FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [vacancies, setVacancies] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const { locale } = useRouter();
  // const lang = locale || 'ru';

  // useEffect(() => {
  //   setIsLoading(true);
  // }, [locale]);

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

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
