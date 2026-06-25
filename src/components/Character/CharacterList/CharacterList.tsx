import type { Character } from "@/interfaces/character";
import { CharacterCard } from "@/components/Character/CharacterCard/CharacterCard";
import type { CharacterListProps } from "./CharacterList.types";
import './CharacterList.css';

export const CharacterList = ({ characters, favorites, onFavorite, onSelect }: CharacterListProps) => {
  return (
    <div className="gridCards">
      {characters.map((character: Character) => (
        <CharacterCard
              key={character.id}
              character={character}
              isFavorite={favorites?.some((fav) => fav.id === character.id)}
              onFavorite={
                () => onFavorite(character)
              } 
              onSelect={
                () => onSelect(character)
              }        
        />
      ))}
    </div>
  );
};
