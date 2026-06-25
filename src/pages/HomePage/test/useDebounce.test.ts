import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "../useDebounce";
import { act } from "react";

describe('test useDebounce', ()=> {
    it('should return the initial value', () => {
        const {result} = renderHook(() => 
            useDebounce('Rick',1000));
        
        expect(result.current).toBe('Rick');
    });

    it('should update the value after the delay', () => {
        vi.useFakeTimers();
        
        const { result, rerender } = renderHook(({value}) => 
            useDebounce(value, 1000),
            {
                initialProps: { value: 'Ri' },
            });
        rerender({ value: 'Rick'});

        expect(result.current).toBe('Ri');

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(result.current).toBe('Rick');
        vi.useRealTimers();
    });

    it('should ot update before the delay', () => {
        vi.useFakeTimers();
        const { result, rerender } = renderHook(({ value }) =>
            useDebounce(value, 500), {
                initialProps: { value: 'Rick'},
            }
    );

    rerender({ value: 'Morty' });

    act(() => { vi.advanceTimersByTime(300); });

    expect(result.current).toBe('Rick');

    vi.useRealTimers();

    })
})