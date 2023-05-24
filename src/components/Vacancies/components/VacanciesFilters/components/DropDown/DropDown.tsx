import { FC, useEffect, MouseEvent } from 'react';
import s from './DropDown.module.scss';
import { VacanciesIcon } from '@/shared/components/IconComponents/Vacancies';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type {
  CurrentCategoryState,
  DropdownState,
  HotState,
  ResetFiltersState,
} from '../../../../Vacancies';

type Props = {
  categoriesTitle: string;
  categories: ICategory[];
  dropdownState: DropdownState;
  hotState: HotState;
  resetCurrentPage: () => void;
  clearSearch: (string: string) => void;
  categoriesState: CurrentCategoryState;
  resetFiltersState: ResetFiltersState;
};

export const DropDown: FC<Props> = ({
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
  const handleSelection = ({ currentTarget }: MouseEvent<HTMLLIElement>) => {
    if (currentCategory === currentTarget.id) setCurrentCategory('');
    else setCurrentCategory(currentTarget.id);
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

        <VacanciesIcon name="dropdown-arrow" />
      </button>

      <ul className={isDropdownShown ? s.list_shown : s.list}>
        {categories.map(category => {
          const { categoryTitle } = category.attributes;

          return (
            <li className={s.item} key={categoryTitle} id={categoryTitle} onClick={handleSelection}>
              <p className={currentCategory === categoryTitle ? s.optionCurrentName : s.optionName}>
                {categoryTitle}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
