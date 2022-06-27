import React from "react";
import styles from "./Pagination.module.css";
import classNames from "classnames";

export const Pagination = ({
  videosPerPage,
  totalvideos,
  paginate,
  currentPageNumber,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalvideos / videosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.numbers_list}>
        {pageNumbers.map((number) => {
          return (
            <li
              onClick={() => paginate(number)}
              key={number}
              className={classNames(
                styles.number,
                currentPageNumber === number
                  ? styles.enable_pageNumber_style
                  : styles.disabled_pageNumber_style
              )}
            >
              {number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
