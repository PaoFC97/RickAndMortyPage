import { getCharacters } from '@/service/get-characters-by-page.actions';
import type { Character } from '@/interfaces/character';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

export const useCharacters = (
  page: number,
  search: string
) => {

  const [characters, setCharacters] =
    useState<Character[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [totalPages, setTotalPages] =
    useState(0);

  const cache = useRef(new Map());

useEffect(() => {
  const loadCharacters =
    async () => {
      try {

        setLoading(true);
        setError(null);

        const cacheKey =`${page}-${search}`;

        if (cache.current.has(cacheKey)) {
          const cached = cache.current.get(cacheKey);
          setCharacters(cached.characters);
          setTotalPages(cached.totalPages);
          return;
        }

        const response = await getCharacters(page, search);

        cache.current.set(
          cacheKey,
          {
            characters: response.results,
            totalPages: response.info.pages,
          }
        );

        setCharacters(response.results);
        setTotalPages(response.info.pages);
      } catch {
        setError(
          'Error loading characters'
        );

      } finally {
        setLoading(false);
      }
    };
  loadCharacters();
}, [page, search]);

  return {
    characters,
    loading,
    error,
    totalPages,
  };
};