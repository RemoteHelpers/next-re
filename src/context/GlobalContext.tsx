import React, { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

export type ContextValue = {
  navURL: string;
  setNavURL: (string: string) => void;
  isLoading: boolean;
  setIsLoading: (boolean: boolean) => void;
  currentLang: string;
  setCurrentLang: (string: string) => void;
};
export interface ProviderProps {
  children: ReactNode;
}

const defaultValue: ContextValue = {
  navURL: '',
  setNavURL: () => {},
  isLoading: true,
  setIsLoading: () => {},
  currentLang: '',
  setCurrentLang: () => {},
};
export const GlobalContext = createContext<ContextValue>(defaultValue);

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [navURL, setNavURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { locale, asPath } = useRouter();
  const initialLang = locale === 'uk' ? 'UA' : locale?.toUpperCase()!;
  const [currentLang, setCurrentLang] = useState<string>(initialLang);

  useEffect(() => {
    if (!navURL) return;
    if (asPath === navURL || asPath === `/${navURL}`) setNavURL('');
    else setIsLoading(true);
  }, [navURL]);

  useEffect(() => {
    setIsLoading(false);
    setNavURL('');
  }, [locale, asPath]);

  const contextValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      navURL,
      setNavURL,
      currentLang,
      setCurrentLang,
    }),
    [isLoading, navURL, currentLang]
  );

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
