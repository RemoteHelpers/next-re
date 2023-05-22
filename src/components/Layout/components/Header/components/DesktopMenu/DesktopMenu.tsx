import React, { useState, useEffect } from 'react';
import s from './DesktopMenu.module.scss';
import { Category, IVacancy } from '@/shared/types';
import Link from 'next/link';
import { BurgerMenuIcon } from '@/shared/components/IconComponents/Header';
import { useRouter } from 'next/router';

type Props = {
  desktopMenuState: {
    isDesktopMenuShown: boolean;
    setIsDesktopMenuShown: (boolean: boolean) => void;
  };
  headerData: any;
};

export const DesktopMenu: React.FC<Props> = ({ desktopMenuState, headerData }) => {
  const { isDesktopMenuShown, setIsDesktopMenuShown } = desktopMenuState;
  const { categories, vacancies } = headerData;
  const {
    attributes: { categoryTitle: initialCategoryState },
  } = categories.find((el: any) => el.attributes.categorySlug !== 'other');
  const [currentCategory, setCurrentCategory] = useState<string>(initialCategoryState);

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

  const backdropHandler = ({ target, currentTarget }: any) => {
    if (target === currentTarget) setIsDesktopMenuShown(false);
  };

  const closeMenu = () => {
    if (isDesktopMenuShown) setIsDesktopMenuShown(false);
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
          {categories.map(({ attributes }: Category) => {
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

              return (
                <li key={createdAt.toString()}>
                  <Link
                    href={`/${categoriesInfo[0].attributes.categorySlug}/${vacancySlug}`}
                    onClick={closeMenu}
                  >
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
