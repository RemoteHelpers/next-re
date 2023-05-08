import React from 'react';
import s from './VacanciesPagination.module.scss';

export const VacanciesPagination = ({
  paginationConfig: { currentPage, totalPages, setCurrentPage },
  titleRef,
}: any) => {
  const renderButtons = (): number[] => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) buttons.push(i);
    return buttons;
  };

  const isActive = (num: number): boolean => {
    if (currentPage === num) return true;
    else return false;
  };

  const navToPage = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    titleRef.current.scrollIntoView();
  };

  return (
    <ul className={s.numBar}>
      {renderButtons().map(numEl => {
        return (
          <li key={`numBtn_${numEl}_`}>
            <button
              type="button"
              onClick={() => navToPage(numEl)}
              className={isActive(numEl) ? s.numBtn_active : s.numBtn}
              disabled={isActive(numEl)}
            >
              {numEl}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
