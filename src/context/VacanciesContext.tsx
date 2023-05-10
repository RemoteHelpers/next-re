import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { IVacancy } from "@/shared/types";
import { getVacancies } from "@/services";
import { useRouter } from "next/router";

export type ContextValue = {
  vacancies: IVacancy[];
  setVacancies: ([]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export interface ProviderProps {
  children: ReactNode;
}

const defaultValue: ContextValue = {
  vacancies: [],
  setVacancies: () => {},
  isLoading: true,
  setIsLoading: () => {},
};

export const VacanciesContext = createContext<ContextValue>(defaultValue);

export const VacanciesProvider: FC<ProviderProps> = ({
  children,
}: ProviderProps) => {
  const [vacancies, setVacancies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getVacancies(router.locale || "ru")
      .then((res: any) => {
        setVacancies(res);
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [router.locale]);

  const contextValue = useMemo(
    () => ({
      vacancies,
      setVacancies,
      isLoading,
      setIsLoading,
    }),
    [vacancies, isLoading]
  );

  return (
    <VacanciesContext.Provider value={contextValue}>
      {children}
    </VacanciesContext.Provider>
  );
};
