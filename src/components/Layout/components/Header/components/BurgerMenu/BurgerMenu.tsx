import React, { useEffect, useContext, useState } from 'react';
import s from './BurgerMenu.module.scss';
import { INavItem } from '../../Header';
import Link from 'next/link';
import { VacanciesContext } from '@/context';
import type { Category, IVacancy } from '@/shared/types';

type MenuState = {
  isBurgerMenu: boolean;
  setIsBurgerMenu: (boolean: boolean) => void;
};

type Props = {
  navList: INavItem[];
  menuState: MenuState;
  headerData: any;
};

export const BurgerMenu: React.FC<Props> = ({ navList, menuState, headerData }) => {
  const { categories, vacancies } = useContext(VacanciesContext);
  const [currentTab, setCurrentTab] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('');
  const { menu } = headerData.navData.attributes;
  console.log('menu', menu);

  const { isBurgerMenu } = menuState;

  const navToThird = (value: string) => {
    setCurrentCategory(value);
    setCurrentTab(3);
  };

  const filteredVacancies = (): IVacancy[] => {
    return vacancies
      .filter((el: IVacancy) => {
        return el.attributes.categories.data[0].attributes.categoryTitle === currentCategory;
      })
      .sort((a: IVacancy, b: IVacancy): number => {
        return (
          new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime()
        );
      })
      .sort((a: IVacancy, b: IVacancy): -1 | 1 | 0 => {
        if (a.attributes.isHot && !b.attributes.isHot) return -1;
        if (!a.attributes.isHot && b.attributes.isHot) return 1;
        return 0;
      });
  };

  useEffect(() => {
    if (document) {
      const body = document.querySelector('body')!;
      if (isBurgerMenu) body.classList.add('no-scroll');
      else body.classList.remove('no-scroll');
    }
  }, [isBurgerMenu]);

  return (
    <div className={isBurgerMenu ? s.menuWrap_shown : s.menuWrap}>
      <p className={s.menuTitle} onClick={() => setCurrentTab(1)}>
        Меню
      </p>

      <nav className={s.navigation}>
        <ul className={currentTab === 1 ? s.firstTab_shown : s.firstTab}>
          {menu.map(({ title, path_id }: any) => (
            <li key={path_id}>
              {path_id !== 'vacancies' ? (
                <Link href={`/${path_id}`}>{title}</Link>
              ) : (
                <button type="button" onClick={() => setCurrentTab(2)}>
                  {title}
                </button>
              )}
            </li>
          ))}
        </ul>

        <ul className={currentTab === 2 ? s.secondTab_shown : s.secondTab}>
          {categories.length &&
            categories.map(({ attributes: { categoryTitle, createdAt } }: Category) => (
              <li key={createdAt.toString()}>
                <button
                  className={s.navBtn}
                  type="button"
                  onClick={() => navToThird(categoryTitle)}
                >
                  {categoryTitle}
                </button>
              </li>
            ))}
        </ul>

        <ul className={currentTab === 3 ? s.thirdTab_shown : s.thirdTab}>
          {filteredVacancies().map(({ attributes }: IVacancy) => {
            const {
              createdAt,
              title,
              categories: { data: categoriesInfo },
              vacancySlug,
            } = attributes;

            return (
              <li key={createdAt.toString()}>
                <Link href={`/${categoriesInfo[0].attributes.categorySlug}/${vacancySlug}`}>
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
