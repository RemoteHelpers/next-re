import React, { useEffect, useState } from 'react';
import s from './CurrentVacancies.module.scss';
import { CurrentVacanciesChoosing } from './components/CurrentVacanciesChoosing';
import { CurrentVacanciesList } from './components/CurrentVacanciesList';

export const CurrentVacancies = ({ vacanciesInfo, categories, vacancies }: any) => {
  const [searchValue, setSearchValue] = useState('');
  const [isHot, setIsHot] = useState(true);
  const [chosenCategorySlug, setChosenCategorySlug] = useState('');
  const [chosenCategoryName, setChosenCategoryName] = useState(null);
  const [vacanciesList, setVacanciesList] = useState(vacancies.data);

  useEffect(() => {
    setVacanciesList(vacancies.data);
  }, [vacancies]);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <CurrentVacanciesChoosing
          vacanciesInfo={vacanciesInfo}
          categories={categories}
          searchState={{ searchValue, setSearchValue }}
          hotState={{ isHot, setIsHot }}
          filtersState={{
            chosenCategorySlug,
            setChosenCategorySlug,
            chosenCategoryName,
            setChosenCategoryName,
          }}
        />

        <CurrentVacanciesList
          vacancies={vacanciesList}
          vacanciesInfo={vacanciesInfo}
          isHot={isHot}
          searchValue={searchValue}
          filtersState={{
            chosenCategorySlug,
            chosenCategoryName,
          }}
        />
      </div>
    </section>
  );
};
