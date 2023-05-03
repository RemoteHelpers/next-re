import React, { useRef, useState } from 'react';
import s from './CurrentVacancies.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacancies';

export const CurrentVacancies = ({ vacanciesData }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [isHotChecked, setIsHotChecked] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const checkboxWrapRef = useRef<HTMLDivElement>(null);

  const { title, placeholder, categoriesTitle, hotVacancies, allVacancies } = vacanciesData;

  const toggleChecked = () => {};

  return (
    <section className={s.section}>
      <h2 className={s.title}>{title}</h2>

      <div className={s.searchWrap}>
        <input
          className={s.search}
          placeholder={placeholder}
          value={inputValue}
          onChange={({ target: { value } }) => setInputValue(value)}
        />

        <CurrentVacanciesIcon id="search" />
      </div>

      <div className={s.categoryTypeWrap}>
        <select name="categorySelector" id="categorySelector">
          <option value="default">{categoriesTitle}</option>
        </select>

        <input
          ref={checkboxRef}
          type="checkbox"
          name="hotVacanciesToggler"
          id="hotVacanciesToggler"
          checked={isHotChecked}
          onChange={() => {}}
          className={s.checkbox}
        />

        <div
          ref={checkboxWrapRef}
          className={isHotChecked ? s.hotCheckboxWrap : s.checkboxWrap}
          onClick={() => setIsHotChecked(!isHotChecked)}
        >
          <div className={s.hotIcon}>
            <CurrentVacanciesIcon id="hot" />
          </div>

          <p className={s.checkboxTitle}>{isHotChecked ? hotVacancies : allVacancies}</p>
        </div>
      </div>
    </section>
  );
};
