import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './DesktopMenu.module.scss';
import type { ICategory } from '@/shared/types/CategoriesTypes';
import type { IVacancy } from '@/shared/types/VacanciesTypes';
import { BurgerMenuIcon } from '@/shared/components/IconComponents/Header';
import { GlobalContext } from '@/context';

type Props = {
  desktopMenuState: {
    isDesktopMenuShown: boolean;
    setIsDesktopMenuShown: (boolean: boolean) => void;
  };
  categories: ICategory[];
};

export const DesktopMenu: React.FC<Props> = ({ desktopMenuState, categories }) => {
  const { isDesktopMenuShown, setIsDesktopMenuShown } = desktopMenuState;
  const {
    attributes: { categoryTitle: initialCategoryState },
  } = categories.find((el: ICategory) => el.attributes.categorySlug !== 'other') as ICategory;
  const [currentCategory, setCurrentCategory] = useState<string>(initialCategoryState);
  const { setNavURL, vacancies } = useContext(GlobalContext);

  const navToLink = (path: string): void => {
    setIsDesktopMenuShown(false);
    setNavURL(path);
  };

  const filteredVacancies = (): IVacancy[] => {
    return vacancies
      .filter((el: IVacancy) => {
        return el.attributes.categories.data[0]?.attributes.categoryTitle === currentCategory;
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

  const backdropHandler = ({ target, currentTarget }: React.MouseEvent) => {
    if (target === currentTarget) setIsDesktopMenuShown(false);
  };

  // useEffect(() => {
  //   if (!document) return;
  //   if (isDesktopMenuShown) document.addEventListener('scroll', closeMenu, { once: true });
  // }, [isDesktopMenuShown]);

  // useEffect(() => {
  //   const body = document?.querySelector('body')!;
  //   if (isDesktopMenuShown) body.classList.add('no-scroll');
  //   else if (!isDesktopMenuShown) body.classList.remove('no-scroll');
  // }, [isDesktopMenuShown]);

  useEffect(() => {
    setCurrentCategory(initialCategoryState);
  }, [useRouter().locale]);

  return (
    <div
      className={isDesktopMenuShown ? s.backdrop_shown : s.backdrop}
      onMouseOver={backdropHandler}
      onClick={backdropHandler}
    >
      <nav className={s.navMenu}>
        <ul className={s.categoriesList}>
          {categories.map(({ attributes }: ICategory) => {
            const { categoryTitle, createdAt, categorySlug } = attributes;

            if (!currentCategory && categorySlug !== 'other') setCurrentCategory(categoryTitle);
            if (categorySlug === 'other') return;
            return (
              <li key={createdAt.toString()}>
                <button
                  className={
                    currentCategory === categoryTitle ? s.categoryBtn_active : s.categoryBtn
                  }
                  type="button"
                  onClick={() => setCurrentCategory(categoryTitle)}
                >
                  <BurgerMenuIcon name={categorySlug} />
                  <span className={s.categoryName}>{categoryTitle}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <ul className={s.vacanciesList}>
          {isDesktopMenuShown &&
            filteredVacancies().map(({ attributes }: IVacancy) => {
              const {
                createdAt,
                title,
                categories: { data: categoriesInfo },
                vacancySlug,
              } = attributes;

              const path = `/${categoriesInfo[0].attributes.categorySlug}/${vacancySlug}`;

              return (
                <li key={createdAt.toString()}>
                  <Link href={path} onClick={() => navToLink(path)}>
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
