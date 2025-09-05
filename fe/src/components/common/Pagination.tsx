import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  // Generate page numbers to display
  const generatePagination = () => {
    // Always show first and last page
    const firstPage = 1;
    const lastPage = totalPages;

    // Calculate range of pages to show around current page
    const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPage);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);

    // Determine if we need to show ellipsis
    const shouldShowLeftDots = leftSiblingIndex > firstPage + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPage - 1;

    // Generate the array of page numbers to display
    const pageNumbers = [];

    // Always add first page
    if (totalPages > 0) {
      pageNumbers.push(firstPage);
    }

    // Add left ellipsis if needed
    if (shouldShowLeftDots) {
      pageNumbers.push(-1); // Use -1 to represent ellipsis
    }

    // Add pages around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== firstPage && i !== lastPage) {
        pageNumbers.push(i);
      }
    }

    // Add right ellipsis if needed
    if (shouldShowRightDots) {
      pageNumbers.push(-2); // Use -2 to represent ellipsis (different key from left)
    }

    // Always add last page if it's different from first page
    if (totalPages > 1) {
      pageNumbers.push(lastPage);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePagination();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center mt-8" aria-label="Pagination">
      <ul className="flex space-x-1">
        {/* Previous button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md ${
              currentPage === 1
                ? 'text-neutral-400 cursor-not-allowed'
                : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
            }`}
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((pageNumber, index) => {
          // Render ellipsis
          if (pageNumber < 0) {
            return (
              <li key={pageNumber}>
                <span className="px-4 py-2 text-neutral-500">...</span>
              </li>
            );
          }

          // Render page number
          return (
            <li key={pageNumber}>
              <button
                onClick={() => onPageChange(pageNumber)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === pageNumber
                    ? 'bg-primary-500 text-white dark:bg-primary-600'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
                aria-current={currentPage === pageNumber ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Next button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md ${
              currentPage === totalPages
                ? 'text-neutral-400 cursor-not-allowed'
                : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
            }`}
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
