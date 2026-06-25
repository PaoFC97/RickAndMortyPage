import type { Character } from "@/interfaces/character";

export interface CharacterListProps {
  characters: Character[];
  favorites: Character[];
  onFavorite: (character: Character) => void;
  onSelect: (character: Character) => void;
}