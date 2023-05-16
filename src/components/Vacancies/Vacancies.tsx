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
  const initialHotState = useRouter().asPath === '/' ? true : false;
  const [searchQuery, setSearchQuery] = useState('');
  const [isHot, setIsHot] = useState(initialHotState);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
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

  const resetCurrentPage = (): void => {
    if (currentPage !== 1) setCurrentPage(1);
  };

  const resetFilters = (): void => {
    if (searchQuery) setSearchQuery('');
    if (!isHot) setIsHot(initialHotState);
    if (currentCategory) setCurrentCategory('');
    if (isDropdownShown) setIsDropdownShown(false);
  };

  // useEffect(() => {
  //   console.log('currentCategory', currentCategory);
  // }, []);

  useEffect(() => {
    resetFilters();
    resetCurrentPage();
  }, [locale]);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <VacanciesFilters
          vacanciesInfo={vacanciesInfo}
          categories={categories}
          searchState={{ searchQuery, setSearchQuery }}
          hotState={{ isHot, setIsHot, initialHotState }}
          categoriesState={{ currentCategory, setCurrentCategory }}
          setTitleRef={titleRef}
          resetCurrentPage={resetCurrentPage}
          dropdownState={{ isDropdownShown, setIsDropdownShown }}
        />

        <VacanciesList
          vacancies={vacancies}
          vacanciesInfo={vacanciesInfo}
          isHot={isHot}
          searchQuery={searchQuery}
          paginationConfig={paginationConfig}
          currentCategory={currentCategory}
        />

        {totalPages > 1 && (
          <VacanciesPagination paginationConfig={paginationConfig} titleRef={titleRef} />
        )}
      </div>
    </section>
  );
};
