import React from 'react';
import s from './VacanciesPagination.module.scss';

export const TestPagination = ({
  paginationConfig: { currentPage, totalPages, setCurrentPage },
  titleRef,
}) => {
  //   const renderButtons = () => {
  //     const buttons = [];
  //     for (let i = 1; i <= 19; i++) buttons.push(i);
  //     return buttons;
  //   };

  const isActive = num => {
    if (currentPage === num) return true;
    else return false;
  };

  const navToPage = pageNumber => {
    setCurrentPage(pageNumber);
    // titleRef.current.scrollIntoView();
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) buttons.push(i);

    const lastIndex = buttons.length - 1;
    const currentIndex = buttons.indexOf(currentPage);

    if (totalPages < 5) return buttons;
    const backstepMainIndex = lastIndex - currentPage - 1;

    if (currentPage === 1) buttons.splice(currentIndex + 3, lastIndex - 3, 'prevDots');
    else if (currentPage <= 3) buttons.splice(currentIndex + 2, backstepMainIndex, 'prevDots');
    else if (currentPage > 3 && currentPage !== buttons.length) {
      buttons.splice(1, currentPage - 3, 'prevDots');
      if (backstepMainIndex > 0) buttons.splice(5, backstepMainIndex, 'nextDots');
    } else if (currentPage === buttons.length) buttons.splice(1, buttons.length - 4, 'prevDots');

    return buttons;
  };

  return (
    <ul className={s.numBar}>
      {renderButtons().map((numEl, i) => {
        return (
          <li key={`numBtn_${numEl}_${numEl * i}`}>
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
              <p>...</p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

// import React, { useState } from 'react';
// import ReactPaginate from 'react-paginate';

// function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map(item => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

// export function TestPagination({ itemsPerPage = 6 }) {
//   const [itemOffset, setItemOffset] = useState(0);

//   const testButtons = () => {
//     const buttons = [];
//     for (let i = 1; i <= 111; i++) buttons.push(i);
//     return buttons;
//   };

//   const btnsArr = testButtons();

//   const endOffset = itemOffset + itemsPerPage;
//   console.log('endOffset', endOffset);
//   //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//   const currentItems = btnsArr.slice(itemOffset, endOffset);
//   console.log('currentItems', currentItems);
//   const pageCount = Math.ceil(btnsArr.length / itemsPerPage);

//   // Invoke when user click to request another page.
//   const handlePageClick = event => {
//     const newOffset = (event.selected * itemsPerPage) % btnsArr.length;
//     // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// }
