import React from "react";
import "./Pagination.css";

const Pagination = ({ page, totalPages, handlePageChange }) => {
  const maxButtons = page < 5 || page > totalPages - 5 ? 7 : 6;

  let startPage = Math.max(
    1,
    Math.min(page - Math.floor(maxButtons / 2), totalPages - maxButtons + 1)
  );

  if (startPage + maxButtons > totalPages) {
    startPage = Math.max(1, totalPages - maxButtons + 1);
  }

  const paginationButtons = [];

  for (let i = startPage; i < startPage + maxButtons && i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={page === i ? "active-button" : "button"}
      >
        {i}
      </button>
    );
  }

  if (startPage > 1) {
    paginationButtons.unshift(
      <button
        key="first"
        onClick={() => handlePageChange(1)}
        className="button"
      >
        1
      </button>
    );
  }

  if (startPage + maxButtons - 1 < totalPages) {
    paginationButtons.push(
      <button
        key="last"
        onClick={() => handlePageChange(totalPages)}
        className="button"
      >
        {totalPages}
      </button>
    );
  }

  return <div className="pagination">{paginationButtons}</div>;
};

export default Pagination;
