import React, { useState } from 'react';
import s from './CurrentVacanciesList.module.scss';

interface Props {
  vacancies: any;
  vacanciesData: any;
}

export const CurrentVacanciesList: React.FC<Props> = ({ vacancies, vacanciesData }) => {
  console.log('file: CurrentVacanciesList.tsx:10 ~ vacanciesData >>', vacanciesData);
  console.log('file: CurrentVacanciesList.tsx:9 ~ vacancies >>', vacancies);
  return (
    <>
      <ul>
        {vacancies.map(({ attributes }: any) => {
          const { isHot, createdAt } = attributes;

          return (
            <li key={createdAt} className={s.vacancyCard}>
              {isHot && <p>{vacanciesData.isHotValue}</p>}

              {attributes.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};
