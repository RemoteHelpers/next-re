import React from 'react';
import s from './VacanciesPagination.module.scss';

export const VacanciesPagination = ({
  paginationConfig: { currentPage, pagesCount, setCurrentPage },
}: any) => {
  const renderButtons = (): number[] => {
    const buttons = [];
    for (let i = 1; i <= pagesCount; i++) buttons.push(i);
    return buttons;
  };

  const isActive = (num: number) => {
    if (currentPage === num) return true;
    else return false;
  };

  const navToPage = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <ul className={s.numBar}>
      {renderButtons().map(numEl => {
        return (
          <li key={`${numEl}_numBtn`}>
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
