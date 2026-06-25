import type { Character } from "../../../interfaces/character";

export interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onFavorite: () => void;
  onSelect: () => void;
}