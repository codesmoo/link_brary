import React from 'react';
import style from './pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className={style.wrapper}>
      <div
        className={`${style.arrow} ${currentPage === 1 ? style.disabled : ''}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        &lt;
      </div>

      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <div
            key={idx}
            className={`${style.page} ${p === currentPage ? style.active : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </div>
        ) : (
          <div key={idx} className={style.ellipsis}>
            {p}
          </div>
        )
      )}

      <div
        className={`${style.arrow} ${
          currentPage === totalPages ? style.disabled : ''
        }`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        &gt;
      </div>
    </div>
  );
}
