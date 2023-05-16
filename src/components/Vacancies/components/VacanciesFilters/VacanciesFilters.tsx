import React, { useEffect, useRef } from 'react';
import s from './VacanciesFilters.module.scss';
import { VacansiesIcon } from '@/shared/components/IconComponents/Vacancies';
import { DropDown } from './components/DropDown';

export const VacanciesFilters = ({
  vacanciesInfo: { title, placeholder, categoriesTitle, hotVacancies, allVacancies },
  categories,
  hotState,
  searchState: { searchQuery, setSearchQuery },
  setTitleRef,
  resetCurrentPage,
  categoriesState,
  dropdownState,
  resetState,
}: any) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { isHot, setIsHot, initialHotState } = hotState;
  const { currentCategory } = categoriesState;
  const {
    setNeedResetCategory,
    needResetHot,
    setNeedResetHot,
    needResetSearch,
    setNeedResetSearch,
  } = resetState;

  const handleSearchChange = ({ target: { value } }: any) => {
    setSearchQuery(value);
  };

  const handleClearSearch = (): void => {
    if (!searchQuery) return;
    setSearchQuery('');
    resetCurrentPage();
  };

  const switchIsHot = () => {
    setIsHot(!isHot);
    resetCurrentPage();
  };

  useEffect(() => {
    if (needResetSearch) setNeedResetSearch(false);
    if (needResetSearch && searchQuery) setSearchQuery('');
    if (!needResetSearch && searchQuery) {
      resetCurrentPage();
      setNeedResetCategory(true);
      setNeedResetHot(true);
    }
  }, [needResetSearch, searchQuery]);

  useEffect(() => {
    if (needResetHot) setNeedResetHot(false);
    if (needResetHot && isHot !== initialHotState) setIsHot(initialHotState);
  }, [needResetHot, isHot]);

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

          <button type="button" onClick={handleClearSearch} className={s.searchBtn}>
            {searchQuery ? (
              <VacansiesIcon name="close-cross" />
            ) : (
              <VacansiesIcon name="magnifying-glass" />
            )}
          </button>
        </div>

        <div className={s.filterTypeWrap}>
          <DropDown
            categories={categories}
            categoriesTitle={categoriesTitle}
            hotState={hotState}
            resetCurrentPage={resetCurrentPage}
            clearSearch={setSearchQuery}
            categoriesState={categoriesState}
            dropdownState={dropdownState}
            resetFiltersState={resetState}
          />

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
                <VacansiesIcon name="fire" />
              </span>

              <p className={s.switcherTitle}>{isHot ? hotVacancies : allVacancies}</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
