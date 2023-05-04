import React, { useState } from 'react';
import s from './CurrentVacancies.module.scss';
import { CurrentVacanciesChoosing } from './components/CurrentVacanciesChoosing';
import { CurrentVacanciesList } from './components/CurrentVacanciesList';

export const CurrentVacancies = ({ vacanciesData, categories, vacancies }: any) => {
  const [searchValue, setSearchValue] = useState('');
  const [isHot, setIsHot] = useState(false);
  const [vacanciesList, setVacanciesList] = useState(vacancies.data);

  // return (
    <section className={s.section}>
      <CurrentVacanciesChoosing
        vacanciesData={vacanciesData}
        categories={categories}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isHot={isHot}
        setIsHot={setIsHot}
        vacancies={vacancies}
      />

      <CurrentVacanciesList vacancies={vacanciesList} vacanciesData={vacanciesData} isHot={isHot} />
    </section>
  );
};
