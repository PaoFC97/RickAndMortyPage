import type { PaginationProps } from '@/components/Pagination/Pagination.types';
import './Pagination.css';
import { usePagination } from './usePagination';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
      const {
        visiblePages,
        canGoNext,
        canGoPrevious,
    } = usePagination({
        currentPage,
        totalPages,
    });

  return (
    <nav className="pagination">

      <button
        className = "arrow"
        disabled={!canGoPrevious}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {'<'}
      </button>

      { visiblePages.map((page, index) => (
        typeof page === 'string' ? (
          <span 
            key={`ellipsis=${index}`}
            className='page'
            >
              {page}
            </span>
        ) : (
          <button
            key={page}
            className={ `page ${currentPage === page 
                            ? 'active' : ''}` }
            onClick={() => onPageChange(page)} >
              {page}
            </button>
        )
      ))}

      <button
        className = "arrow"
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {'>'}
      </button>
    </nav>
  );
};