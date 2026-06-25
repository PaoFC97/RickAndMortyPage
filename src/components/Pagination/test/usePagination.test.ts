import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePagination } from '../usePagination';

describe('usePagination', () => {
    it('should show all pages when total pages is small', () => {
        const { result } = renderHook(() => 
            usePagination({ currentPage: 1, totalPages: 5 }));

        expect(result.current.visiblePages).toEqual([1,2,3,4,5]);
    });

    it('should show the first pages when the current page is 1', () => {
        const {result} = renderHook(() => 
            usePagination({currentPage:1, totalPages: 42 }));
        expect(result.current.visiblePages).toEqual([1,2,3,4,5,'...',42]);

        expect(result.current.canGoPrevious).toBe(false);
        expect(result.current.canGoNext).toBe(true);
    });

    it('should show middle pages correctly', () => {
        const {result} = renderHook(() => 
            usePagination({currentPage:20, totalPages: 42 }));
        expect(result.current.visiblePages).toEqual([1,'...',18,19,20,21,22,'...',42]);
    });

    it('should show last pages correctly', () => {
        const {result} = renderHook(() => 
            usePagination({currentPage:42, totalPages: 42 }));
        expect(result.current.visiblePages).toEqual([1,'...',38,39,40,41,42]);
        expect(result.current.canGoPrevious).toBe(true);
        expect(result.current.canGoNext).toBe(false);
    });

})