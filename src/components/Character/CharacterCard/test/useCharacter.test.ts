import { useCharacters } from '@/components/Character/CharacterCard/useCharacters';
import { getCharacters } from '@/service/get-characters-by-page.actions';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/service/get-characters-by-page.actions', () => ({
    getCharacters: vi.fn(),
}));

const mockedGetCharacters = vi.mocked(getCharacters);

describe('useCharacters', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should load characters successfully', async () => {

        mockedGetCharacters.mockResolvedValue({
            results: [
                {
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
                }
            ],
            info: {
                pages: 42,
                count: 826,
                next: '2',
                prev: null
            }
        });

        const { result } = renderHook(() => useCharacters(1, ''));

        await waitFor(() => { expect(result.current.loading).toBe(false); });

        expect(result.current.characters).toHaveLength(1);
        expect(result.current.totalPages).toBe(42);
        expect(result.current.error).toBeNull();

    });

});