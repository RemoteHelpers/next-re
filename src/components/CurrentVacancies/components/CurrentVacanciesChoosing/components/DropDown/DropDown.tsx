import React, { useState } from 'react';
import s from './DropDown.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacanciesIcon';

type Category = {
  attributes: {
    categorySlug: string;
    categoryTitle: string;
  };
};

type Props = {
  categoriesTitle: string;
  categories: Category[];
  filtersState: any;
  hotState: any;
};

export const DropDown: React.FC<Props> = ({
  categories,
  categoriesTitle,
  filtersState,
  hotState: { isHot, setIsHot },
}) => {
  const [isShown, setIsShown] = useState(false);

  const { chosenCategorySlug, setChosenCategorySlug, chosenCategoryName, setChosenCategoryName } =
    filtersState;

  const handleSelection = (e: any) => {
    if (!isHot) setIsHot(true);

    if (chosenCategorySlug === e.target.id) {
      setChosenCategorySlug('');
      setChosenCategoryName(null);
    } else {
      setChosenCategorySlug(e.target.id);
      setChosenCategoryName(e.target.firstChild.textContent);
    }

    setIsShown(false);
  };

  return (
    <div className={s.dropdown}>
      <button type="button" className={s.dropdownBtn} onClick={() => setIsShown(!isShown)}>
        <span className={s.title}>{chosenCategoryName ?? categoriesTitle}</span>

        <CurrentVacanciesIcon name="dropdown-arrow" />
      </button>

      <ul className={isShown ? s.menu_shown : s.menu}>
        {categories.map(category => {
          const { categorySlug, categoryTitle } = category.attributes;

          return (
            <li className={s.item} key={categorySlug} id={categorySlug} onClick={handleSelection}>
              <p className={s.categoryName}>{categoryTitle}</p>

              <div className={chosenCategorySlug === categorySlug ? s.box_checked : s.box}>
                <div className={s.plug}></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
