import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Pagination.scss";

const Pagination = ({ itemsCount, pageSize, onPageChange, selectedPage }) => {
  const [currentPage, setCurrentPage] = useState(selectedPage);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  const pagesCount = Math.ceil(itemsCount / pageSize);

  const pageNumbers = new Array(pagesCount)
    .fill(0)
    .map((elem, index) => index + 1);

  function nextPage() {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  }

  function prevPage() {
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  }

  if (pagesCount > 1) {
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {currentPage !== 1 && (
            <li className="page-item">
              <button
                className="page-btn"
                onClick={() => {
                  prevPage();
                }}
                aria-label="Previous"
              >
                <FaChevronLeft />
              </button>
            </li>
          )}
          {pageNumbers.map((pageNum) => (
            <li key={pageNum} className="page-item">
              <button
                className={
                  pageNum === currentPage ? "page-btn current-page" : "page-btn"
                }
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            </li>
          ))}
          {currentPage !== pageNumbers.length && (
            <li className="page-item">
              <button
                onClick={() => {
                  nextPage();
                }}
                className="page-btn"
                aria-label="Next"
              >
                <FaChevronRight />
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
};

export default Pagination;
