export interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export interface UsePaginationProps {
    currentPage: number;
    totalPages: number;
}