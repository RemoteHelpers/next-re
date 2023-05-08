import React, { useRef } from 'react';
import s from './CurrentVacanciesChoosing.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacanciesIcon';
import { DropDown } from './components/DropDown';

export const CurrentVacanciesChoosing = ({
  vacanciesInfo,
  categories,
  hotState,
  searchState,
  filtersState,
}: any) => {
  const { searchValue, setSearchValue } = searchState;
  const { isHot, setIsHot } = hotState;
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { title, placeholder, categoriesTitle, hotVacancies, allVacancies } = vacanciesInfo;

  const handleSearchChange = ({ target: { value } }: any) => {
    setSearchValue(value);
    if (!value || !isHot) setIsHot(true);
  };

  const handleSearchClick = () => {
    if (searchValue) setSearchValue('');
    if (!searchValue) return;
  };

  return (
    <>
      <h2 className={s.title}>{title}</h2>

      <div className={s.categoriesFilter}>
        <div className={s.searchWrap}>
          <input
            className={s.searchInput}
            placeholder={placeholder}
            value={searchValue}
            onChange={handleSearchChange}
          />

          <button type="button" onClick={handleSearchClick} className={s.searchBtn}>
            {searchValue ? (
              <CurrentVacanciesIcon name="close-cross" />
            ) : (
              <CurrentVacanciesIcon name="magnifying-glass" />
            )}
          </button>
        </div>

        <div className={s.filterTypeWrap}>
          <DropDown
            filtersState={filtersState}
            categories={categories}
            categoriesTitle={categoriesTitle}
            hotState={hotState}
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

          {filtersState.chosenCategoryName || searchValue ? (
            <div></div>
          ) : (
            <button
              type="button"
              className={isHot ? s.switcher_hot : s.switcher}
              onClick={() => setIsHot(!isHot)}
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
