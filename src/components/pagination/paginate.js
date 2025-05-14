import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginateComponent = ({
  meta = { total_pages: 1, current_page: 1 },
  handleBack,
  handleNext,
  handlePageClick,
}) => {
  const totalPages = meta.total_pages;
  const currentPage = meta.current_page;

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => handleBack(currentPage)}
        disabled={currentPage === 1}
      />
      {renderPaginationItems()}
      <Pagination.Next
        onClick={() => handleNext(currentPage)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginateComponent;
