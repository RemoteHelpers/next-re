import { FC, useEffect, useState, ReactElement } from 'react';
import { useRouter } from 'next/router';
import s from './VacanciesList.module.scss';
import type { PaginationInfo } from '../../../Vacancies/Vacancies';
import type { IVacanciesInfo, IVacancy, IVacancyKeywordTag } from '@/shared/types/VacanciesTypes';
import { VacancyItem } from './components/VacancyItem';
import { Oops } from './components/Oops/Oops';

type Props = {
  vacancies: IVacancy[];
  vacanciesInfo: IVacanciesInfo;
  currentCategory: string;
  searchQuery: string;
  paginationConfig: PaginationInfo;
  isHot: boolean;
};

export const VacanciesList: FC<Props> = ({
  vacancies,
  vacanciesInfo,
  currentCategory,
  searchQuery,
  paginationConfig,
  isHot,
}) => {
  const [vacanciesList, setVacanciesList] = useState(vacancies);
  const { vacansPerPage, currentPage, setTotalPages } = paginationConfig;
  const { locale } = useRouter();

  const changeTotalPages = (): void =>
    setTotalPages(Math.ceil(vacanciesList.length / vacansPerPage));

  const slicePerPage = (vacansArr: ReactElement[]): ReactElement[] => {
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

  const hotVacancies = () => vacancies.filter((el: IVacancy) => el.attributes.isHot);

  const vacanciesBySearch = () => {
    return vacancies
      .filter(
        ({ attributes }: IVacancy) =>
          attributes.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attributes.vacancySlug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attributes.keyword_tags.data.some((keyword: IVacancyKeywordTag) =>
            keyword.attributes.keyPhrase.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
      .sort(sortByDate)
      .sort(sortByHot);
  };

  const vacanciesByCategory = (): IVacancy[] => {
    return vacancies
      .filter(
        (el: IVacancy) =>
          el.attributes.categories.data[0].attributes.categoryTitle === currentCategory
      )
      .sort(sortByDate)
      .sort(sortByHot);
  };

  const vacanicesByDate = (): IVacancy[] => {
    const allVacans = vacancies;
    return allVacans.sort(sortByDate);
  };

  useEffect(() => {
    changeTotalPages();
  });

  useEffect(() => {
    if (searchQuery) setVacanciesList(vacanciesBySearch());
    else if (currentCategory) setVacanciesList(vacanciesByCategory());
    else if (isHot) setVacanciesList(hotVacancies());
    else if (!isHot) setVacanciesList(vacanicesByDate());
  }, [isHot, currentCategory, searchQuery, locale]);

  return (
    <ul className={s.list}>
      {vacanciesList.length ? (
        slicePerPage(
          vacanciesList.map(({ attributes }: IVacancy) => {
            const { createdAt } = attributes;
            return (
              <VacancyItem
                key={createdAt.toString()}
                attributes={attributes}
                vacanciesInfo={vacanciesInfo}
              />
            );
          })
        )
      ) : (
        <Oops vacanciesInfo={vacanciesInfo} />
      )}
    </ul>
  );
};
