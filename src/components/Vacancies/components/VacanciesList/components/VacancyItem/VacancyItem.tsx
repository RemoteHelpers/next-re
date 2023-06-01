import { FC, useCallback, useContext } from 'react';
import s from './VacancyItem.module.scss';
import { IVacanciesInfo, IVacancyAttributes } from '@/shared/types/VacanciesTypes';
import { VacanciesIcon } from '@/shared/components/IconComponents/Vacancies';
import Link from 'next/link';
import { GlobalContext } from '@/context';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type Props = {
  attributes: IVacancyAttributes;
  vacanciesInfo: IVacanciesInfo;
  category?: string;
};

export const VacancyItem: FC<Props> = ({ attributes, vacanciesInfo, category }) => {
  const { isHot, cardDescription, title, categories, vacancySlug } = attributes;
  const { setNavURL } = useContext(GlobalContext);

  const getPathToVacancy = useCallback((): string => {
    if (category) return `/${category}/${vacancySlug}`;
    if (categories) return `/${categories?.data[0]?.attributes.categorySlug}/${vacancySlug}`;
    return '';
  }, [category, vacancySlug]);

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

        <ReactMarkdown className={s.cardDescription}>{`${cardDescription.slice(0, 107)}...`}</ReactMarkdown>
      </div>

      <Link
        href={getPathToVacancy()}
        className={s.link}
        onClick={() => setNavURL(getPathToVacancy())}
      >
        {vacanciesInfo.button}
      </Link>
    </li>
  );
};
