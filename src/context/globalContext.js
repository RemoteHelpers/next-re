import { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [vacancies, setVacancies] = useState([])

  return (
    <GlobalContext.Provider value={{ setVacancies, vacancies }}>
      {children}
    </GlobalContext.Provider>
  );
};