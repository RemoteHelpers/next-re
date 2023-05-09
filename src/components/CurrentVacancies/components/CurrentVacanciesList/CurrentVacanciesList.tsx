import React, { useEffect, useState } from 'react';
import s from './CurrentVacanciesList.module.scss';
import { CurrentVacanciesIcon } from '@/shared/components/IconComponents/CurrentVacanciesIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { PaginationInfo } from '../../CurrentVacancies';

type Vacancy = {
  attributes: { isHot: boolean; updatedAt: Date };
  id: number;
};

type hotSortFoo = {};

type Props = {
  vacancies: any;
  vacanciesInfo: any;
  isHot: boolean;
  filtersState: any;
  searchValue: string;
  paginationConfig: PaginationInfo;
};

export const CurrentVacanciesList: React.FC<Props> = ({
  vacancies,
  vacanciesInfo,
  isHot,
  filtersState,
  searchValue,
  paginationConfig,
}) => {
  const [vacanciesList, setVacanciesList] = useState(vacancies);
  const { chosenCategoryName } = filtersState;
  const { vacansPerPage, currentPage, setTotalPages } = paginationConfig;
  const { locale } = useRouter();

  const changeTotalPages = (): void =>
    setTotalPages(Math.ceil(vacanciesList.length / vacansPerPage));

  const slicePerPage = (vacansArr: any[]): any[] => {
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

  const setAllByDate = () => setVacanciesList(vacancies.sort(sortByDate));

  const hotVacancies = () => vacancies.filter((el: Vacancy) => el.attributes.isHot);

  const searchedVacancies = () => {
    return vacanciesList
      .filter(
        ({ attributes }: any) =>
          attributes.title.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          attributes.vacancySlug.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          attributes.keyword_tags.data.some((keyword: any) =>
            keyword.attributes.keyPhrase.toLowerCase().includes(searchValue.toLowerCase())
          )
      )
      .sort(sortByDate)
      .sort(sortByHot);
  };

  const filteredVacancies = (): any[] => {
    return vacancies
      .filter(
        (el: any) =>
          el.attributes.categories.data[0].attributes.categoryTitle === chosenCategoryName
      )
      .sort(sortByDate)
      .sort(sortByHot);
  };

  useEffect(() => {
    changeTotalPages();
  });

  useEffect(() => {
    if (!isHot) setAllByDate();
    else setVacanciesList(hotVacancies());
    changeTotalPages();
  }, [isHot, locale]);

  useEffect(() => {
    if (!searchValue) setVacanciesList(hotVacancies());
    else setVacanciesList(searchedVacancies());
    changeTotalPages();
  }, [searchValue]);

  useEffect(() => {
    const filtered = filteredVacancies();
    if (!filtered.length) setVacanciesList(hotVacancies());
    else setVacanciesList(filtered);
    changeTotalPages();
  }, [chosenCategoryName]);

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
