import React, { useEffect, useState } from 'react';
import s from './CurrentVacancies.module.scss';
import { CurrentVacanciesChoosing } from './components/CurrentVacanciesChoosing';
import { CurrentVacanciesList } from './components/CurrentVacanciesList';
import { useRouter } from 'next/router';
import { VacanciesPagination } from './components/VacanciesPagination';
import { IVacancy } from '@/shared/types';

type CurrentVacanciesProps = {
  vacanciesInfo: [],
  categories: [],
  vacancies: IVacancy[]
}

export const CurrentVacancies = ({ vacanciesInfo, categories, vacancies }: CurrentVacanciesProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isHot, setIsHot] = useState(true);
  const [chosenCategorySlug, setChosenCategorySlug] = useState('');
  const [chosenCategoryName, setChosenCategoryName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { locale } = useRouter();

  const resetFilters = () => {
    setSearchValue('');
    setIsHot(true);
    setChosenCategorySlug('');
    setChosenCategoryName(null);
  };

  useEffect(() => {
    resetFilters();
  }, [locale]);

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
          // vacancies={vacanciesList}
          vacancies={vacancies}
          vacanciesInfo={vacanciesInfo}
          isHot={isHot}
          searchValue={searchValue}
          filtersState={{
            chosenCategorySlug,
            chosenCategoryName,
          }}
        />

        <VacanciesPagination paginationConfig={{ currentPage, pagesCount: 3, setCurrentPage }} />
      </div>
    </section>
  );
};
