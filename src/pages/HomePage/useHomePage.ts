import type { Character } from "@/interfaces/character";
import { useState, useEffect } from "react";
import { useCharacters } from "../../components/Character/CharacterCard/useCharacters";
import { useDebounce } from "./useDebounce";

export const useHomePage = () => {

    const [search, setSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const [favorites, setFavorites] = useState<Character[]>(() => {
        const stored = localStorage.getItem('favorites');

        if (!stored) { return []; } 

        try {
            return JSON.parse(stored);
        } catch {
            return [];
        }
    });

    const [showFavorites, setShowFavorites] = useState(false);

    const [
        selectedCharacter,
        setSelectedCharacter,
    ] = useState<Character | null>(null);

    const debouncedSearch =useDebounce(search, 1000);

    const {
        characters,
        loading,
        error,
        totalPages,
    } = useCharacters(
        currentPage,
        debouncedSearch
    );

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleFavorite = (
        character: Character
    ) => {
        const exists = favorites.some(favorite => favorite.id === character.id);

        setFavorites( 
            exists ? 
                favorites.filter( favorite => favorite.id !== character.id)
            : [...favorites, character,]
        );
    };

    const displayCharacters = showFavorites ? favorites : characters;

    return {
        loading,
        error,
        totalPages,

        search,
        currentPage,

        favorites,
        selectedCharacter,
        displayCharacters,

        showFavorites,
        setShowFavorites,

        setCurrentPage,
        setSelectedCharacter,

        handleSearch,
        handleFavorite,
    };
};