import React, { useEffect, useRef, useState } from 'react';
import s from './Vacancies.module.scss';
import { VacanciesFilters } from './components/VacanciesFilters';
import { VacanciesList } from './components/VacanciesList';
import { useRouter } from 'next/router';
import { VacanciesPagination } from './components/VacanciesPagination';

export type PaginationInfo = {
  vacansPerPage: number;
  totalPages: number;
  setTotalPages: (pageNumber: number) => void;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
};

export const Vacancies = ({ vacanciesInfo, categories, vacancies }: any) => {
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

  const resetCurrentPage = (): void => setCurrentPage(1);

  const resetFilters = (): void => {
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
        <VacanciesFilters
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

        <VacanciesList
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

        {totalPages > 1 && (
          <VacanciesPagination paginationConfig={paginationConfig} titleRef={titleRef} />
        )}
      </div>
    </section>
  );
};
