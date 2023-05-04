import React, { useEffect, useState } from 'react';
import s from './CurrentVacanciesList.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacanciesIcon';

interface Props {
  vacancies: any;
  vacanciesData: any;
  isHot: boolean;
}

export const CurrentVacanciesList: React.FC<Props> = ({ vacancies, vacanciesData, isHot }) => {
  console.log('file: CurrentVacanciesList.tsx:11 ~ vacanciesData >>', vacanciesData);
  const [vacanciesList, setVacanciesList] = useState(vacancies);

  useEffect(() => {
    let list: any[];

    if (isHot) {
      list = vacancies.filter((el: any) => el.attributes.isHot === true);
      setVacanciesList(list);
    } else {
      setVacanciesList(vacancies);
    }
  }, [isHot]);

  return (
    <>
      <ul className={s.list}>
        {vacanciesList.map(({ attributes }: any) => {
          const { isHot, createdAt, cardDescription } = attributes;

          return (
            <li key={createdAt} className={s.card}>
              <div className={s.titleWrap}>
                {isHot && (
                  <div className={s.hotLabel}>
                    <CurrentVacanciesIcon name="fire" />
                    <p className={s.isHotValue}>{vacanciesData.isHotValue}</p>
                  </div>
                )}

                <h3 className={s.title}>{attributes.title}</h3>
              </div>

              <p className={s.salary}>{vacanciesData.salary}</p>

              <p className={s.cardDescription}>{cardDescription}</p>

              <button type="button" className={s.button}>
                {vacanciesData.button}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
