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
};

export const DropDown: React.FC<Props> = ({ categories, categoriesTitle }) => {
  const [isShown, setIsShown] = useState(false);
  const [chosenCategorySlug, setChosenCategorySlug] = useState('');
  const [chosenCategoryName, setChosenCategoryName] = useState(null);

  const handleSelection = (e: any) => {
    e.stopPropagation();

    if (chosenCategorySlug === e.target.id) {
      setChosenCategorySlug('');
      setChosenCategoryName(null);
      return;
    }

    setChosenCategorySlug(e.target.id);
    setChosenCategoryName(e.target.firstChild.textContent);
    // setIsShown(false);
  };

  return (
    <div className={s.dropdown}>
      <button type="button" className={s.dropdownBtn} onClick={() => setIsShown(!isShown)}>
        <p className={s.title}>{chosenCategoryName ?? categoriesTitle}</p>

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
