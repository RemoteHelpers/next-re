import { FC, RefObject } from 'react';
import s from './VacanciesPagination.module.scss';
import type { PaginationInfo } from '../../Vacancies';

type Props = {
  paginationConfig: PaginationInfo;
  titleRef: RefObject<HTMLHeadingElement>;
};
type paginationItem = number | 'prevDots' | 'nextDots';

export const VacanciesPagination: FC<Props> = ({
  paginationConfig: { currentPage, totalPages, setCurrentPage },
  titleRef,
}) => {
  const renderButtons = (): paginationItem[] => {
    const buttons: paginationItem[] = [];
    for (let i = 1; i <= totalPages; i++) buttons.push(i);
    if (totalPages < 5) return buttons;

    const lastIndex = buttons.length - 1;
    const activeIndex = buttons.indexOf(currentPage);
    const skipCount = lastIndex - currentPage - 1;

    if (currentPage === 1) buttons.splice(activeIndex + 3, lastIndex - 3, 'nextDots');
    else if (currentPage <= 3) buttons.splice(activeIndex + 2, skipCount, 'nextDots');
    else if (currentPage === buttons.length) buttons.splice(1, buttons.length - 4, 'prevDots');
    else {
      buttons.splice(1, currentPage - 3, 'prevDots');
      if (skipCount > 0) buttons.splice(5, skipCount, 'nextDots');
    }

    return buttons;
  };

  const isActive = (num: paginationItem): boolean => {
    if (currentPage === num) return true;
    else return false;
  };

  const navToPage = (pageNumber: paginationItem): void => {
    setCurrentPage(+pageNumber);
    titleRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    // if (titleRef.current?.scrollIntoView) {
    //   titleRef.current?.scrollIntoView({ behavior: 'smooth' });
    // } else {
    //   const titleRect = titleRef.current?.getBoundingClientRect()!;
    //   const absoluteTitleTop = titleRect.top + window.pageYOffset;
    //   console.log('absoluteTitleTop', absoluteTitleTop);
    //   if (window.scrollTo) window.scrollTo({ top: absoluteTitleTop, behavior: 'smooth' });
    //   else window.scroll(0, absoluteTitleTop);
    // }
  };

  return (
    <ul className={s.numBar}>
      {renderButtons().map(numEl => {
        return (
          <li key={`numBtn_${numEl}`}>
            {typeof numEl === 'number' ? (
              <button
                type="button"
                onClick={() => navToPage(numEl)}
                className={isActive(numEl) ? s.numBtn_active : s.numBtn}
                disabled={isActive(numEl)}
              >
                {numEl}
              </button>
            ) : (
              <p className={numEl === 'prevDots' ? s.prevDots : s.nextDots}>...</p>
            )}
          </li>
        );
      })}
    </ul>
  );
};
