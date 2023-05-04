import React, { useRef } from 'react';
import s from './CurrentVacanciesChoosing.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacanciesIcon';
import { DropDown } from './components/DropDown';

export const CurrentVacanciesChoosing = ({
  vacanciesData,
  setIsHot,
  isHot,
  searchValue,
  setSearchValue,
  categories,
  vacancies,
}: any) => {
  console.log('file: CurrentVacanciesChoosing.tsx:15 ~ vacancies >>', vacancies);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { title, placeholder, categoriesTitle, hotVacancies, allVacancies } = vacanciesData;

  return (
    <>
      <h2 className={s.title}>{title}</h2>

      <div className={s.categoriesFilter}>
        <div className={s.searchWrap}>
          <input
            className={s.search}
            placeholder={placeholder}
            value={searchValue}
            onChange={({ target: { value } }) => setSearchValue(value)}
          />

          <CurrentVacanciesIcon name="magnifying-glass" />
        </div>

        <div className={s.categoryTypeWrap}>
          <DropDown categories={categories} categoriesTitle={categoriesTitle} />

          <input
            ref={checkboxRef}
            type="checkbox"
            name="hotVacanciesToggler"
            id="hotVacanciesToggler"
            checked={isHot}
            onChange={() => {}}
            className={s.checkbox}
          />

          <div className={isHot ? s.switcher_hot : s.switcher} onClick={() => setIsHot(!isHot)}>
            <div className={s.hotIcon}>
              <CurrentVacanciesIcon name="fire" />
            </div>

            <p className={s.switcherTitle}>{isHot ? hotVacancies : allVacancies}</p>
          </div>
        </div>
      </div>
    </>
  );
};
