import React, { useState, useEffect } from 'react';
import s from './DropDown.module.scss';
import { VacansiesIcon } from '@/shared/components/IconComponents/Vacancies';
import type { Category } from '@/shared/types';

type HotState = {
  isHot: boolean;
  setIsHot: (boolean: boolean) => void;
  initialHotState: boolean;
};

type DropdownState = {
  isDropdownShown: boolean;
  setIsDropdownShown: (boolean: boolean) => void;
};

type CategoriesState = {
  currentCategory: string;
  setCurrentCategory: (x: string | null) => void;
};

type Props = {
  categoriesTitle: string;
  categories: Category[];
  dropdownState: DropdownState;
  hotState: HotState;
  resetCurrentPage: () => void;
  clearSearch: (string: string) => void;
  categoriesState: CategoriesState;
  resetFiltersState: any;
};

export const DropDown: React.FC<Props> = ({
  categories,
  categoriesTitle,
  categoriesState: { currentCategory, setCurrentCategory },
  resetCurrentPage,
  dropdownState: { isDropdownShown, setIsDropdownShown },
  resetFiltersState: {
    needResetCategory,
    setNeedResetCategory,
    setNeedResetHot,
    setNeedResetSearch,
  },
}) => {
  const handleSelection = (e: any) => {
    if (currentCategory === e.target.id) setCurrentCategory('');
    else setCurrentCategory(e.target.id);
  };

  useEffect(() => {
    setIsDropdownShown(false);
    if (needResetCategory) setNeedResetCategory(false);
    if (needResetCategory && currentCategory) setCurrentCategory('');
    if (!needResetCategory && currentCategory) {
      resetCurrentPage();
      setNeedResetHot(true);
      setNeedResetSearch(true);
    }
  }, [needResetCategory, currentCategory]);

  return (
    <div className={s.wrapper}>
      <button
        type="button"
        className={isDropdownShown ? s.button_clicked : s.button}
        onClick={() => setIsDropdownShown(!isDropdownShown)}
      >
        <span className={s.btnText}>{currentCategory ? currentCategory : categoriesTitle}</span>

        <VacansiesIcon name="dropdown-arrow" />
      </button>

      <ul className={isDropdownShown ? s.list_shown : s.list}>
        {categories.map(category => {
          const { categoryTitle } = category.attributes;

          return (
            // <div className={isDropdownShown ? s.menuWrapper_shown : s.menuWrapper}>
            <li className={s.item} key={categoryTitle} id={categoryTitle} onClick={handleSelection}>
              <p className={currentCategory === categoryTitle ? s.optionCurrentName : s.optionName}>
                {categoryTitle}
              </p>

              {/* <div className={s.optionBox}>
                {categoryTitle === currentCategory && <div className={s.optionCheck}></div>}
              </div> */}
            </li>
            // </div>
          );
        })}
      </ul>
    </div>
  );
};
