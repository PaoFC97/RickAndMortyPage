import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useHomePage } from '../useHomePage';
import type { Character } from '@/interfaces/character';

vi.mock('@/components/Character/CharacterCard/useCharacters.hook', () => ({
    useCharacters: vi.fn(() => ({
        characters: [],
        loading: false,
        error: null,
        totalPages: 42,
    })),
}));

vi.mock('../useDebounce.hook', () => ({
    useDebounce: vi.fn((value: string) => value),
}));

const character: Character= {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1"
    },
    location: {
        name: "Citadel of Ricks",
        url: "https://rickandmortyapi.com/api/location/3"
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
    episode: []
};

describe('useHomePage', () => {

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should reset current page when searching', () => {

        const { result } = renderHook(() => useHomePage());

        act(() => { result.current.setCurrentPage(5); });

        act(() => { result.current.handleSearch('Rick'); });

        expect(result.current.search).toBe('Rick');
        expect(result.current.currentPage).toBe(1);
    });

    it('should add a favorite character', () => {
        const { result } = renderHook(() => useHomePage());
        
        act(() => { result.current.handleFavorite(character); });
        expect(result.current.favorites).toContainEqual(character);

    });

    it('should remove a favorite character', () => {
        const { result } = renderHook(() => useHomePage());

        act(() => { result.current.handleFavorite(character); });
        act(() => { result.current.handleFavorite(character); });
        expect(result.current.favorites).toHaveLength(0);

    });

    it('should toggle favorites view', () => {
        const { result } = renderHook(() => useHomePage());

        expect(result.current.showFavorites).toBe(false);
        act(() => { result.current.setShowFavorites(true);});
        expect(result.current.showFavorites).toBe(true);

    });

    it('should set selected character', () => {
        const { result } = renderHook(() => useHomePage());

        act(() => { result.current.setSelectedCharacter(character);});
        expect(result.current.selectedCharacter).toEqual(character);
    });
});