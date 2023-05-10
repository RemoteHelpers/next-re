import React, { useState, useEffect } from 'react';
import s from './DropDown.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacanciesIcon';
import type { Category } from '@/shared/types';
import Select, { components } from 'react-select';

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
  clearSearch: () => void;
  categoriesState: CategoriesState;
};

export const DropDown: React.FC<Props> = ({
  categories,
  categoriesTitle,
  categoriesState: { currentCategory, setCurrentCategory },
  hotState: { isHot, setIsHot, initialHotState },
  resetCurrentPage,
  clearSearch,
  dropdownState: { isDropdownShown, setIsDropdownShown },
}) => {
  const handleSelection = (e: any) => {
    if (currentCategory === e.target.id) setCurrentCategory('');
    else setCurrentCategory(e.target.id);
  };

  useEffect(() => {
    if (!isHot) setIsHot(initialHotState);
    clearSearch();
    resetCurrentPage();
    setIsDropdownShown(false);
  }, [currentCategory]);

  return (
    <div className={s.dropdown}>
      <button
        type="button"
        className={s.dropdownBtn}
        onClick={() => setIsDropdownShown(!isDropdownShown)}
      >
        <span className={s.title}>{currentCategory ? currentCategory : categoriesTitle}</span>

        <CurrentVacanciesIcon name="dropdown-arrow" />
      </button>

      <ul className={isDropdownShown ? s.menu_shown : s.menu}>
        {categories.map(category => {
          const { categoryTitle } = category.attributes;

          return (
            // <div className={isDropdownShown ? s.menuWrapper_shown : s.menuWrapper}>
            <li className={s.item} key={categoryTitle} id={categoryTitle} onClick={handleSelection}>
              <p className={s.categoryName}>{categoryTitle}</p>

              <div className={s.box}>
                {categoryTitle === currentCategory && <div className={s.plug}></div>}
              </div>
            </li>
            // </div>
          );
        })}
      </ul>
    </div>
  );
};
