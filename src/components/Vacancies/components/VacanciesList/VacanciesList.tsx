import React, { useEffect, useState } from 'react';
import s from './VacanciesList.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacanciesIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { PaginationInfo } from '../../../Vacancies/Vacancies';
import type { Vacancy } from '@/shared/types';

type Props = {
  vacancies: any;
  vacanciesInfo: any;
  // isHot: boolean;
  currentCategory: string;
  searchQuery: string;
  paginationConfig: PaginationInfo;
  hotState: any;
};

export const VacanciesList: React.FC<Props> = ({
  vacancies,
  vacanciesInfo,
  // isHot,
  currentCategory,
  searchQuery,
  paginationConfig,
  hotState: { isHot, initialHotState },
}) => {
  const [vacanciesList, setVacanciesList] = useState(vacancies);
  const { vacansPerPage, currentPage, setTotalPages } = paginationConfig;
  const { locale } = useRouter();

  const changeTotalPages = (): void =>
    setTotalPages(Math.ceil(vacanciesList.length / vacansPerPage));

  const slicePerPage = (vacansArr: Vacancy[]): any[] => {
    const skipIndex = currentPage > 1 ? vacansPerPage * (currentPage - 1) : 0;
    const limitIndex = skipIndex + vacansPerPage;
    const sliced = vacansArr.slice(skipIndex, limitIndex);
    return sliced;
  };

  const sortByHot = (a: Vacancy, b: Vacancy): -1 | 1 | 0 => {
    if (a.attributes.isHot && !b.attributes.isHot) return -1;
    if (!a.attributes.isHot && b.attributes.isHot) return 1;
    return 0;
  };

  const sortByDate = (a: Vacancy, b: Vacancy): number => {
    return new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime();
  };

  const setAllByDate = () => {
    setVacanciesList(vacancies);
    setVacanciesList(vacanciesList.sort(sortByDate));
  };

  const hotVacancies = () => vacancies.filter((el: Vacancy) => el.attributes.isHot);

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

  // useEffect(() => {
  //   if (!isHot) setAllByDate();
  //   else setVacanciesList(hotVacancies());
  //   changeTotalPages();
  // }, [isHot]);

  // useEffect(() => {
  //   if (!searchQuery) setVacanciesList(hotVacancies());
  //   else setVacanciesList(vacanciesBySearch());
  //   changeTotalPages();
  // }, [searchQuery]);

  // useEffect(() => {
  //   const filtered = vacanciesByCategory();
  //   if (!filtered.length) setVacanciesList(hotVacancies());
  //   else setVacanciesList(filtered);
  //   changeTotalPages();
  // }, [currentCategory]);

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
