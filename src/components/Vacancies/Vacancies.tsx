import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import s from './Vacancies.module.scss';
import type { INavUrlState, IVacanciesInfo, IVacancy, ICategory } from '@/shared/types';
import { VacanciesFilters } from './components/VacanciesFilters';
import { VacanciesList } from './components/VacanciesList';
import { VacanciesPagination } from './components/VacanciesPagination';

type Props = {
  vacanciesInfo: IVacanciesInfo;
  categories: ICategory[];
  vacancies: IVacancy[];
  navUrlState: INavUrlState;
};
export type PaginationInfo = {
  vacansPerPage: number;
  totalPages: number;
  setTotalPages: (pageNumber: number) => void;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
};

export const Vacancies: React.FC<Props> = ({
  vacanciesInfo,
  categories,
  vacancies,
  navUrlState,
}) => {
  const { locale, asPath } = useRouter();
  const initialHotState = asPath === '/' ? true : false;
  const [isHot, setIsHot] = useState<boolean>(initialHotState);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownShown, setIsDropdownShown] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [needResetCategory, setNeedResetCategory] = useState<boolean>(false);
  const [needResetHot, setNeedResetHot] = useState<boolean>(false);
  const [needResetSearch, setNeedResetSearch] = useState<boolean>(false);
  const vacansPerPage = 9;
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(vacancies.length / vacansPerPage));
  const titleRef = useRef<HTMLHeadingElement>(null);

  const paginationConfig: PaginationInfo = {
    vacansPerPage,
    totalPages,
    setTotalPages,
    currentPage,
    setCurrentPage,
  };

  const resetCurrentPage = (): void => {
    if (currentPage !== 1) setCurrentPage(1);
  };

  const resetFilters = (): void => {
    if (searchQuery) setSearchQuery('');
    if (!isHot) setIsHot(initialHotState);
    if (currentCategory) setCurrentCategory('');
    if (isDropdownShown) setIsDropdownShown(false);
  };

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
          resetState={{
            needResetCategory,
            setNeedResetCategory,
            needResetHot,
            setNeedResetHot,
            needResetSearch,
            setNeedResetSearch,
          }}
        />

        <VacanciesList
          vacanciesInfo={vacanciesInfo}
          isHot={isHot}
          searchQuery={searchQuery}
          paginationConfig={paginationConfig}
          currentCategory={currentCategory}
          vacancies={vacancies}
          navUrlState={navUrlState}
        />

        {totalPages > 1 && (
          <VacanciesPagination paginationConfig={paginationConfig} titleRef={titleRef} />
        )}
      </div>
    </section>
  );
};

export type HotState = {
  isHot: boolean;
  setIsHot: (boolean: boolean) => void;
  initialHotState: boolean;
};

export type SearchState = {
  searchQuery: string;
  setSearchQuery: (string: string) => void;
};

export type CurrentCategoryState = {
  currentCategory: string;
  setCurrentCategory: (string: string) => void;
};

export type DropdownState = {
  isDropdownShown: boolean;
  setIsDropdownShown: (boolean: boolean) => void;
};

export type ResetFiltersState = {
  needResetCategory: boolean;
  setNeedResetCategory: (boolean: boolean) => void;
  needResetHot: boolean;
  setNeedResetHot: (boolean: boolean) => void;
  needResetSearch: boolean;
  setNeedResetSearch: (boolean: boolean) => void;
};
