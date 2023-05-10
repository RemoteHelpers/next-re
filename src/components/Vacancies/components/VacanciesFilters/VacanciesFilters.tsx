import React, { useEffect, useRef } from 'react';
import s from './VacanciesFilters.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacanciesIcon';
import { DropDown } from './components/DropDown';
import { Test } from './components/DropDown/Test';

export const VacanciesFilters = ({
  vacanciesInfo,
  categories,
  hotState,
  searchState,
  setTitleRef,
  resetCurrentPage,
  categoriesState,
  dropdownState,
}: any) => {
  const { searchQuery, setSearchQuery } = searchState;
  const { isHot, setIsHot, initialHotState } = hotState;
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { title, placeholder, categoriesTitle, hotVacancies, allVacancies } = vacanciesInfo;
  const { currentCategory, setCurrentCategory } = categoriesState;

  const handleSearchChange = ({ target: { value } }: any) => {
    setSearchQuery(value);
    resetCurrentPage();
  };

  const handleClear = (): void => {
    if (!searchQuery) return;
    setSearchQuery('');
    resetCurrentPage();
  };

  const switchIsHot = () => {
    setIsHot(!isHot);
    resetCurrentPage();
  };

  useEffect(() => {
    if (!searchQuery || !isHot) setIsHot(initialHotState);
    if (searchQuery && currentCategory) setCurrentCategory('');
  }, [searchQuery]);

  return (
    <>
      <h2 className={s.title} ref={setTitleRef}>
        {title}
      </h2>

      <div className={s.categoriesFilter}>
        <div className={s.searchWrap}>
          <input
            className={s.searchInput}
            placeholder={placeholder}
            id="search-vacancy-input"
            name="search-vacancy-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <button type="button" onClick={handleClear} className={s.searchBtn}>
            {searchQuery ? (
              <CurrentVacanciesIcon name="close-cross" />
            ) : (
              <CurrentVacanciesIcon name="magnifying-glass" />
            )}
          </button>
        </div>

        <div className={s.filterTypeWrap}>
          <DropDown
            categories={categories}
            categoriesTitle={categoriesTitle}
            hotState={hotState}
            resetCurrentPage={resetCurrentPage}
            clearSearch={() => setSearchQuery('')}
            categoriesState={categoriesState}
            dropdownState={dropdownState}
          />
          {/* <Test /> */}

          <input
            ref={checkboxRef}
            type="checkbox"
            name="hotVacanciesToggler"
            id="hotVacanciesToggler"
            checked={isHot}
            onChange={() => {}}
            className={s.checkbox}
          />

          {!currentCategory && !searchQuery && (
            <button
              type="button"
              className={isHot ? s.switcher_hot : s.switcher}
              onClick={switchIsHot}
            >
              <span className={s.hotIcon}>
                <CurrentVacanciesIcon name="fire" />
              </span>

              <p className={s.switcherTitle}>{isHot ? hotVacancies : allVacancies}</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
