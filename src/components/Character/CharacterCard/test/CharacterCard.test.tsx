import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CharacterCard } from '../CharacterCard';
import type { Character } from '@/interfaces/character';

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

describe('CharacterCard', () => {

    it('should render the character information', () => {

        render(
            <CharacterCard
                character={character}
                isFavorite={false}
                onFavorite={vi.fn()}
                onSelect={vi.fn()}
            />
        );

        expect(screen.getByText(character.name)).toBeInTheDocument();

        expect(screen.getByRole('img')).toHaveAttribute('src', character.image);

    });

    it('should call onSelect when the card is clicked', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        render(
            <CharacterCard
                character={character}
                isFavorite={false}
                onFavorite={vi.fn()}
                onSelect={onSelect}
            /> );

        const card = screen.getByRole('button', {name: /character-card/i});

        await user.click(card);

        expect(onSelect).toHaveBeenCalledOnce();

    });

    it('should call onFavorite when the favorite button is clicked', async () => {
        const user = userEvent.setup();
        const onFavorite = vi.fn();

        render(
            <CharacterCard
                character={character}
                isFavorite={false}
                onFavorite={onFavorite}
                onSelect={vi.fn()}
            />
        );

        const favoriteButton = screen.getByRole('button', { name: /favorite-button/i });
        await user.click(favoriteButton);

        expect(onFavorite).toHaveBeenCalledOnce();

    });

    it('should not call onSelect when the favorite button is clicked', async () => {
        const user = userEvent.setup();
        const onFavorite = vi.fn();
        const onSelect = vi.fn();

        render(
            <CharacterCard
                character={character}
                isFavorite={false}
                onFavorite={onFavorite}
                onSelect={onSelect}
            />
        );

        const favoriteButton = screen.getByRole('button', { name: /favorite-button/i });

        await user.click(favoriteButton);

        expect(onFavorite).toHaveBeenCalledOnce();
        expect(onSelect).not.toHaveBeenCalled();

    });

});