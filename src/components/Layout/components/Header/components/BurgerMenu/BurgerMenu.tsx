import React, { useEffect, useState, useContext } from 'react';
import s from './BurgerMenu.module.scss';
import Link from 'next/link';
import type { Category, IVacancy } from '@/shared/types';
import { BurgerMenuIcon } from '@/shared/components/IconComponents/Header';
import { GlobalContext } from '@/context';

type MenuState = {
  isBurgerMenu: boolean;
  setIsBurgerMenu: (boolean: boolean) => void;
};

type Props = {
  menuState: MenuState;
  headerData: any;
};

export const BurgerMenu: React.FC<Props> = ({ menuState, headerData }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('');
  const { isBurgerMenu, setIsBurgerMenu } = menuState;
  const { menu, menuValue, backValue, allVacanciesValue } = headerData.header;
  const { categories, vacancies } = headerData;
  const { setNavURL } = useContext(GlobalContext);

  const navToLink = (path: string) => {
    setIsBurgerMenu(false);
    setNavURL(path);
  };

  const navToFirst = () => setCurrentTab(1);
  const navToSecond = () => setCurrentTab(2);
  const navToThird = (categoryName: string) => {
    setCurrentCategory(categoryName);
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
    if (!document) return;
    const body = document.querySelector('body')!;
    if (isBurgerMenu) body.classList.add('no-scroll');
    else if (!isBurgerMenu) {
      body.classList.remove('no-scroll');
      if (currentTab !== 1) setCurrentTab(1);
      if (currentCategory) setCurrentCategory('');
    }
  }, [isBurgerMenu]);

  return (
    <div className={isBurgerMenu ? s.menuWrap_shown : s.menuWrap}>
      <p className={s.menuTitle}>{menuValue}</p>

      <nav className={s.navigation}>
        <ul className={currentTab === 1 ? s.firstTab_shown : s.firstTab}>
          {menu.map(({ title, path_id }: any) => {
            if (!path_id.trim()) return;
            return (
              <li key={path_id}>
                {path_id !== 'vacancies' ? (
                  <Link href={`/${path_id}`} onClick={() => navToLink(path_id)}>
                    {title}
                  </Link>
                ) : (
                  <button type="button" onClick={navToSecond}>
                    {title}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <ul className={currentTab === 2 ? s.secondTab_shown : s.secondTab}>
          <li>
            <button className={s.backBtn} type="button" onClick={navToFirst}>
              <BurgerMenuIcon name="left-arrow" />
              {backValue}
            </button>
          </li>

          <li>
            <Link href={`/vacancies`} onClick={() => navToLink('vacancies')}>
              {allVacanciesValue}
            </Link>
          </li>

          {currentTab === 2 &&
            categories.map(({ attributes }: Category) => {
              const { categoryTitle, createdAt, categorySlug } = attributes;
              if (categorySlug === 'other') return;
              return (
                <li key={createdAt.toString()}>
                  <button
                    className={s.navBtn}
                    type="button"
                    onClick={() => navToThird(categoryTitle)}
                  >
                    <BurgerMenuIcon name={categorySlug} />
                    {categoryTitle}
                  </button>
                </li>
              );
            })}
        </ul>

        <ul className={currentTab === 3 ? s.thirdTab_shown : s.thirdTab}>
          <li>
            <button className={s.backBtn} type="button" onClick={navToSecond}>
              <BurgerMenuIcon name="left-arrow" />
              {currentCategory}
            </button>
          </li>

          {currentTab === 3 &&
            filteredVacancies().map(({ attributes }: IVacancy) => {
              const {
                createdAt,
                title,
                categories: { data: categoriesInfo },
                vacancySlug,
              } = attributes;

              const path = `${categoriesInfo[0].attributes.categorySlug}/${vacancySlug}`;

              return (
                <li key={createdAt.toString()}>
                  <Link href={`/${path}`} onClick={() => navToLink(path)}>
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
