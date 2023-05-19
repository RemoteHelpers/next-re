import React from 'react';
import s from './VacancyItem.module.scss';
import { IVacancy, IVacancyAttr } from '@/shared/types';
import { VacanciesIcon } from '@/shared/components/IconComponents/Vacancies';
import Link from 'next/link';

type Props = {
  attributes: IVacancyAttr;
  vacanciesInfo: any;
};

export const VacancyItem: React.FC<Props> = ({ attributes, vacanciesInfo }) => {
  const {
    isHot,
    cardDescription,
    title,
    categories: { data: categoriesInfo },
    vacancySlug,
  } = attributes;

  return (
    <li className={s.card}>
      <div className={s.mainWrap}>
        <div className={s.titleWrap}>
          {isHot && (
            <div className={s.hotLabel}>
              <VacanciesIcon name="fire" />
              <p className={s.labelText}>{vacanciesInfo.isHotValue}</p>
            </div>
          )}

          <h3 className={s.title}>{title}</h3>
        </div>

        <p className={s.salary}>{vacanciesInfo.salary}</p>

        <p className={s.cardDescription}>{`${cardDescription.slice(0, 107)}...`}</p>
      </div>

      <Link
        href={`/${categoriesInfo[0].attributes.categorySlug}/${vacancySlug}`}
        className={s.link}
      >
        {vacanciesInfo.button}
      </Link>
    </li>
  );
};
