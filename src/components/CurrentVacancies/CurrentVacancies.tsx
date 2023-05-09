import React, { useEffect, useRef, useState } from 'react';
import s from './CurrentVacancies.module.scss';
import { CurrentVacanciesChoosing } from './components/CurrentVacanciesChoosing';
import { CurrentVacanciesList } from './components/CurrentVacanciesList';
import { useRouter } from 'next/router';
import { VacanciesPagination } from './components/VacanciesPagination';

export type PaginationInfo = {
  vacansPerPage: number;
  totalPages: number;
  setTotalPages: (pageNumber: number) => void;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
};

export const CurrentVacancies: React.FC = ({ vacanciesInfo, categories, vacancies }: any) => {
  const [searchValue, setSearchValue] = useState('');
  const [isHot, setIsHot] = useState(true);
  const [chosenCategorySlug, setChosenCategorySlug] = useState('');
  const [chosenCategoryName, setChosenCategoryName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const vacansPerPage = 9;
  const [totalPages, setTotalPages] = useState(Math.ceil(vacancies.length / vacansPerPage));
  const titleRef = useRef(null);

  const paginationConfig: PaginationInfo = {
    vacansPerPage,
    totalPages,
    setTotalPages,
    currentPage,
    setCurrentPage,
  };

  const { locale } = useRouter();

  const resetCurrentPage = () => setCurrentPage(1);

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
          setTitleRef={titleRef}
          resetCurrentPage={resetCurrentPage}
        />

        <CurrentVacanciesList
          vacancies={vacancies}
          vacanciesInfo={vacanciesInfo}
          isHot={isHot}
          searchValue={searchValue}
          filtersState={{
            chosenCategorySlug,
            chosenCategoryName,
          }}
          paginationConfig={paginationConfig}
        />

        <VacanciesPagination paginationConfig={paginationConfig} titleRef={titleRef} />
      </div>
    </section>
  );
};
