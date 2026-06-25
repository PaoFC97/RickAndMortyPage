import { useMemo } from "react";
import type { UsePaginationProps } from "./Pagination.types"
import { SIDE_PAGES, WINDOW_SIZE } from "@/contants/contants";

export const usePagination = ({
    currentPage,
    totalPages
}: UsePaginationProps) => {

    const getWindow = () => {
        let start = currentPage - SIDE_PAGES;
        let end = currentPage + SIDE_PAGES;

        if (start < 1) {
            end += 1 - start;
            start = 1;
        }

        if (end > totalPages) {
            start -= end - totalPages;
            end = totalPages;
        }

        return {
            start: Math.max(1, start),
            end,
        };
    };

    const createRange = ( start: number, end: number ) =>
        Array.from( { length: end - start + 1 }, (_, index) => start + index );

    const visiblePages = useMemo(() => {
        if(totalPages <= WINDOW_SIZE+2) {
            return Array.from({length: totalPages}, (_, index) => index+1)
        }

        const pages: (number | string)[] = [];

        const { start, end } = getWindow();

        pages.push(1);
        if(start>2) {
            pages.push('...');
        }

        pages.push(...createRange( Math.max(2, start), Math.min(end, totalPages - 1)));

        if(end < totalPages - 1) {
            pages.push('...');
        }
        pages.push(totalPages);
        
        return pages;

    }, [currentPage, totalPages]);

    return {
        visiblePages,
        canGoNext: currentPage < totalPages,
        canGoPrevious: currentPage > 1,
    };
}