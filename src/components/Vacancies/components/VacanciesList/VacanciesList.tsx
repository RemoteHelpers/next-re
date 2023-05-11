import React, { useEffect, useState } from 'react';
import s from './VacanciesList.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacanciesIcon';
import Link from 'next/link';
import type { PaginationInfo } from '../../../Vacancies/Vacancies';
import type { IVacancy } from '@/shared/types';

type Props = {
  vacancies: any;
  vacanciesInfo: any;
  currentCategory: string;
  searchQuery: string;
  paginationConfig: PaginationInfo;
  hotState: any;
};

export const VacanciesList: React.FC<Props> = ({
  vacancies,
  vacanciesInfo,
  currentCategory,
  searchQuery,
  paginationConfig,
  hotState: { isHot },
}) => {
  const [vacanciesList, setVacanciesList] = useState(vacancies);
  const { vacansPerPage, currentPage, setTotalPages } = paginationConfig;

  const changeTotalPages = (): void =>
    setTotalPages(Math.ceil(vacanciesList.length / vacansPerPage));

  const slicePerPage = (vacansArr: IVacancy[]): any[] => {
    const skipIndex = currentPage > 1 ? vacansPerPage * (currentPage - 1) : 0;
    const limitIndex = skipIndex + vacansPerPage;
    const sliced = vacansArr.slice(skipIndex, limitIndex);
    return sliced;
  };

  const sortByHot = (a: IVacancy, b: IVacancy): -1 | 1 | 0 => {
    if (a.attributes.isHot && !b.attributes.isHot) return -1;
    if (!a.attributes.isHot && b.attributes.isHot) return 1;
    return 0;
  };

  const sortByDate = (a: IVacancy, b: IVacancy): number => {
    return new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime();
  };

  const setAllByDate = () => {
    setVacanciesList(vacancies);
    setVacanciesList(vacanciesList.sort(sortByDate));
  };

  const hotVacancies = () => vacancies.filter((el: IVacancy) => el.attributes.isHot);

  const vacanciesBySearch = () => {
    return vacancies
      .filter(
        ({ attributes }: any) =>
          attributes.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
          attributes.vacancySlug.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
          attributes.keyword_tags.data.some((keyword: any) =>
            keyword.attributes.keyPhrase.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
      .sort(sortByDate)
      .sort(sortByHot);
  };

  const vacanciesByCategory = (): any[] => {
    return vacancies
      .filter(
        (el: any) => el.attributes.categories.data[0].attributes.categoryTitle === currentCategory
      )
      .sort(sortByDate)
      .sort(sortByHot);
  };

  useEffect(() => {
    changeTotalPages();
  });

  useEffect(() => {
    if (searchQuery) setVacanciesList(vacanciesBySearch());
    else if (currentCategory) {
      const filtered = vacanciesByCategory();
      setVacanciesList(filtered);
    } else if (isHot) setVacanciesList(hotVacancies());
    else if (!isHot) {
      const allVacans = vacancies;
      setVacanciesList(allVacans.sort(sortByDate));
    }
  }, [isHot, currentCategory, searchQuery]);

  return (
    <ul className={s.list}>
      {vacanciesList.length ? (
        slicePerPage(
          vacanciesList.map(({ attributes }: any) => {
            const {
              isHot,
              createdAt,
              cardDescription,
              title,
              categories: { data: categoriesInfo },
              vacancySlug,
            } = attributes;

            return (
              <li key={createdAt} className={s.card}>
                <div className={s.mainWrap}>
                  <div className={s.titleWrap}>
                    {isHot && (
                      <div className={s.hotLabel}>
                        <CurrentVacanciesIcon name="fire" />
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
          })
        )
      ) : (
        <p>Sorry we didn't found anything</p>
      )}
    </ul>
  );
};
